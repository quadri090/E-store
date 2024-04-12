import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { PaymentElement, AddressElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Btn from "../components/Btn";

interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handlePaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handlePaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
    handlePaymentSuccess(false);
  }, [stripe]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Payment Success");

          handleClearCart();
          handlePaymentSuccess(true);
          handlePaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return <form onSubmit={handleSubmit} id="payment-form">
    <div className="mb-6">
        <Heading title='Enter your details to complete checkout'></Heading>
    </div>
    <h2 className="font-semibold mb-2">Address Information</h2>

    <AddressElement options={{
        mode: "shipping",
        allowedCountries: ["US", "KE"]
    }}/>
    <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
    <PaymentElement id="payment-element" options={{layout: "tabs"}}/>
    <div className="py-4 text-center text-slate-700 text-xl font-bold">Total: {formattedPrice}</div>
    <Btn label={isLoading ? "Processing" : "Pay Now"} onClick={() => {}} disabled={isLoading  || !stripe || !elements}/>
  </form>;
};

export default CheckoutForm;
