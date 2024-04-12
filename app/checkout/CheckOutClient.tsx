"use client"
import { useCart } from "@/hooks/useCart"
import { Elements } from  '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import CheckoutForm from "./CheckoutForm"
import Btn from "../components/Btn"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckOutClient = () => {
    const router = useRouter()
    const {cartProducts, paymentIntent, handlePaymentIntent} = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    // console.log("paymentIntent:", paymentIntent)
    // console.log("client_secret:",clientSecret)

    useEffect(() => {
        if(cartProducts) {
            setLoading(true)
            setError(false)

           fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: cartProducts,
                payment_intent_id: paymentIntent
            })
           }).then((res) => {
            setLoading(false)
            if(res.status === 401){
                return router.push('/login')
            }

            return res.json()
           }).then((data) => {
            setClientSecret(data.paymentIntent.client_secret) //data returned from stripe api
            handlePaymentIntent(data.paymentIntent.id)
           }).catch((error) => {
            toast.error('Something went wrong' + error)
           })
        }
    }, [cartProducts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: 'floating'
        }
    }

    const handlePaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])

  return (
    <div className="w-full">
        {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} handlePaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
      {loading && <div className="flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-info"></div>
      </div> }
      {error && <div className="text-center text-rose-500">Error loading page</div> }
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
            <div className="text-teal-500 text-center">Payment Successful</div>
            <div className="max-w-[220px] w-full">
                <Btn label="View Your Orders" onClick={() => router.push('/orders')}></Btn>
            </div>
        </div>
      )}
    </div>
  )
}

export default CheckOutClient