// src/components/ComprarForm.jsx
import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import styles from './ComprarForm.module.css';

export default function ComprarForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setMessage("O sistema de pagamento ainda não está pronto. Por favor, aguarde um momento.");
      return;
    }

    setIsProcessing(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // URL para redirecionar após pagamento aprovado ou boleto pago
        return_url: `${window.location.origin}/minhaConta?status=sucesso`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("Ocorreu um erro inesperado ao processar seu pagamento.");
      }
    } else {
      // O Stripe redirecionará automaticamente, mas caso não redirecione:
      setMessage("Pagamento processado com sucesso! Redirecionando...");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <PaymentElement />
      
      {message && (
        <div className={`${styles.message} ${message.includes("erro") || message.includes("inesperado") ? styles.error : styles.success}`}>
          {message}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className={styles.submitBtn}
      >
        {isProcessing ? (
          <span className={styles.processing}>Processando...</span>
        ) : (
          "Finalizar Pagamento"
        )}
      </button>
    </form>
  );
}
