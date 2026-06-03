// src/components/ComprarForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import styles from './ComprarForm.module.css';

export default function ComprarForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage("Stripe.js ainda não carregado.");
      return;
    }

    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // URL para redirecionar após pagamento aprovado ou boleto pago
        return_url: "https://elainecharm.com/sucesso",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Pagamento processado. Aguarde o redirecionamento.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pagar
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
