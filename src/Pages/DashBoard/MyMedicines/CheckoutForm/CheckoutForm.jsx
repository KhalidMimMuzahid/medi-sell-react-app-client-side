import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import "./Style/style.css";
const CheckoutForm = ({ payingMedicine, refetch }) => {
  console.log("payingMedicine : ", payingMedicine);
  const price = payingMedicine?.offerPrice * payingMedicine?.quantity;
  const buyerEmail = payingMedicine?.buyer?.buyerEmail;
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [isPaid, setIspaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setPaymentError("");
    setIsPaying(true);

    setPaymentStatus("");
    setPaymentId("");

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error?.message);
      setIsPaying(false);

      return;
    } else {
      setPaymentError("");
      //   console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: buyerEmail,
          },
        },
      });
    if (confirmError) {
      setIsPaying(false);
      setPaymentError(confirmError.message);
      return;
    }
    if (paymentIntent) {
      // TODO: update database for change payment status  post_id paymentIntent?.id
      fetch(
        `https://medi-sell.vercel.app/setpaymentstatus?_id=${payingMedicine?._id}&paymentId=${paymentIntent?.id}`,
        { method: "POST" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.acknowledged) {
            setPaymentStatus(paymentIntent?.status);
            setPaymentId(paymentIntent?.id);
            setIspaid(true);
            setIsPaying(false);
            refetch();
          } else {
            setPaymentError("something went wrong, please try again");
          }
        });
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://medi-sell.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("xxxx", data);
        setClientSecret(data.clientSecret);
      });
  }, [price]);
  return (
    <form onSubmit={handleSubmit} className="">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {paymentError && <h1 className="text-red-700">{paymentError}</h1>}
      <button
        className="py-1 w-full font-bold"
        disabled={
          isPaying ||
          !stripe ||
          payingMedicine?.paymentStatus === "paid" ||
          isPaid
        }
        type="submit"
      >
        Pay
      </button>
      {isPaying && <Loader type="progressor" />}
      {paymentStatus === "succeeded" && paymentId && !isPaying && (
        <div>
          <h1 className="text-green-700 text-lg">you have paid successfully</h1>
          <h1>
            payment Id: <span className="font-bold text-lg">{paymentId}</span>
          </h1>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
