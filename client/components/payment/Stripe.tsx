"use client";

import React from "react";
import { Button } from "../ui/button";
// import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import stripePayment from "../../assets/Stripe.png";
import Image from "next/image";

interface Props {
  name: string;
  id: string;
  amount: string;
}

const Stripe = ({ name, id, amount }: Props) => {
  const makePayement = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );
      const body = {
        id,
        amount,
        name,
      };
      const response = await fetch(
        "http://localhost:4000/api/payment/landlord/stripe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const { id: sessionId } = await response.json();
      if (sessionId) {
        stripe?.redirectToCheckout({
          sessionId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className=" mb-2 mt-5 bg-[#6b63f8] hover:bg-[#635bf7] text-white w-full h-10"
        onClick={() => makePayement()}
      >
        <Image
          src={stripePayment}
          alt="Khalti Payment"
          width={50}
          height={50}
          className=""
        />
        Stripe Payment
      </Button>
    </div>
  );
};

export default Stripe;
