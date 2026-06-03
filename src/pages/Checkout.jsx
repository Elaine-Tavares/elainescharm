//Resumo rápido:
//Seu <Elements> precisa receber o clientSecret do backend, não só a stripePromise.
//Você cria o PaymentIntent no backend e pega o clientSecret.
//Passa esse clientSecret para o <Elements>.
//Renderiza o <PaymentElement> dentro do <Elements>.
//Usa stripe.confirmPayment() no submit pra finalizar o pagamento.

// src/components/Checkout/Checkout.jsx
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ComprarForm from "../components/ComprarForm";
import { Helmet } from "react-helmet";
import api from "../services/api";

const stripePromise = loadStripe("pk_test_51RpTT8BXYXcVjJgwSBhMlYrKEflfvt2A1WnqIT1QXF1Xqqthp4YCmqm4twFW2yb5mLwNuXybMkFBzUrVeVtzNjpV00A1tXbIU5");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Sempre que o método de pagamento mudar, pede um novo clientSecret
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await api.post("create-payment-intent.php", {
          amount: 1000, // 10 reais, por exemplo
          payment_method_type: paymentMethod,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Erro ao criar PaymentIntent:", error);
      }
    };
    createPaymentIntent();
  }, [paymentMethod]);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Helmet>
        <title>Finalizar compra | Elaine's Charm</title>
        <meta name="description" content="Revise seus produtos e finalize sua compra com segurança na Elaine's Charm." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <h2>Forma de pagamento</h2>
      <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
        <option value="card">Cartão de Crédito</option>
        <option value="boleto">Boleto</option>
        <option value="pix" disabled>Pix (em breve)</option>
      </select>

      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <ComprarForm paymentMethod={paymentMethod} />
        </Elements>
      )}
    </>
  );
}


