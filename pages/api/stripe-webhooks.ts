import { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import { buffer } from "micro"


export const config = {
    api: {
        bodyParser: false
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
})

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    if(!sig){
        return res.status(400).send("Missing the")
    }

    let event: Stripe.Event

    try{
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOKS_SECRET!)
    }catch (err) {
        return res.status(400).send("Webhooks error" + err)
    }

    switch(event.type) {
        case 'charge.succeeded': 
        const charge: any = event.data.object as Stripe.Charge

        if(typeof charge.payment_intent === 'string'){
            await prisma?.orderdata.update({
                where: {paymentIntentId: charge.payment_intent},
                data: {status: 'completed', address: charge.shipping?.address}
            })
        }
        break;
        default:
            console.log("Unhandled event type" + event.type)
    }

    res.json({recieved: true})
    
}


//https://dashboard.stripe.com/test/webhooks
//https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
//https://scoop.sh/
//https://docs.stripe.com/stripe-cli