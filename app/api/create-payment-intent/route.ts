import { Stripe } from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/ProductDetails";
import { getCurrentUser } from "@/actions.ts/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateTotalAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    //reduce method iterates over every item in items and multiplies the item price with it's quantity. Result is added to in the accumulator which was initially zero, then the result of the next iteration is added to the current accumulator value and so on.
    const itemTotal = item.price * item.quantity;

    return acc + itemTotal;
  }, 0);

  const price = Math.floor(totalPrice)

  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reqBody = await request.json();
  const { items, payment_intent_id } = reqBody;
  const total = calculateTotalAmount(items) * 100; //Multiplied by 100 because stripe payment is in cents
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      //update the order
      const [ existing_order, updated_order ] = await Promise.all([
        prisma.orderdata.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.orderdata.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        );
      }

      return NextResponse.json({ paymentIntent: updated_intent });
    }

  } else {
    //create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma.orderdata.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
}
