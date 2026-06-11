// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ComprarForm from "../components/ComprarForm";
import { Helmet } from "react-helmet";
import api from "../services/api";
import Container from "../components/Container";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51RpTT8BXYXcVjJgwSBhMlYrKEflfvt2A1WnqIT1QXF1Xqqthp4YCmqm4twFW2yb5mLwNuXybMkFBzUrVeVtzNjpV00A1tXbIU5");

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cart, setCart] = useState([]);
  const [frete, setFrete] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCart(savedCart);

    const freteSalvo = JSON.parse(localStorage.getItem('frete'))
    setFrete(freteSalvo)
    console.log("FRETE", frete)
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.valor_do_produto) * item.quantidade, 0) + frete;
  };

  const total = calculateTotal();

  // Sempre que o método de pagamento mudar ou o carrinho carregar, pede um novo clientSecret
  useEffect(() => {
    if (cart.length === 0) return;

    const createPaymentIntent = async () => {
      setLoading(true);
      try {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
        const response = await api.post("create-payment-intent.php", {
          items: cart.map(item => ({
            id: item.id_do_produto,
            quantidade: item.quantidade
          })),
          payment_method_type: paymentMethod,
          usuario_email: usuarioLogado?.email
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Erro ao criar PaymentIntent:", error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [paymentMethod, cart, total]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#cc0066',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (cart.length === 0) {
    return (
      <Container>
        <div className={styles.emptyCart}>
          <h2 className={styles.title}>Seu carrinho está vazio</h2>
          <p>Adicione alguns produtos antes de finalizar a compra.</p>
          <Link to="/produtos" className={styles.btnBack}>Ver produtos</Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>Finalizar compra | Elaine's Charm</title>
        <meta name="description" content="Revise seus produtos e finalize sua compra com segurança na Elaine's Charm." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className={styles.checkoutContainer}>
        <h1 className={styles.title}>Finalizar Compra</h1>

        <div className={styles.content}>
          <div className={styles.paymentSection}>
            <h2 className={styles.sectionTitle}>Forma de Pagamento</h2>
            
            <div className={styles.methodSelector}>
              <button 
                className={`${styles.methodBtn} ${paymentMethod === 'card' ? styles.activeMethod : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <span>💳 Cartão de Crédito</span>
              </button>
              <button 
                className={`${styles.methodBtn} ${paymentMethod === 'boleto' ? styles.activeMethod : ''}`}
                onClick={() => setPaymentMethod('boleto')}
              >
                <span>📄 Boleto Bancário</span>
              </button>
              <button 
                className={styles.methodBtn} 
                disabled 
                title="Em breve"
              >
                <span>📱 Pix (Em breve)</span>
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Preparando ambiente seguro...</div>
            ) : (
              clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                  <ComprarForm paymentMethod={paymentMethod} />
                </Elements>
              )
            )}
          </div>

          <div className={styles.summarySection}>
            <h2 className={styles.sectionTitle}>Resumo do Pedido</h2>
            <div className={styles.orderList}>
              {cart.map((item) => (
                <div key={item.id_do_produto} className={styles.orderItem}>
                  <span>{item.quantidade}x {item.nome_do_produto}</span>
                  <span>R$ {(parseFloat(item.valor_do_produto) * item.quantidade).toFixed(2)}</span>
                </div>
              ))}  
            </div>
            <div className={styles.orderItem}>
              <span>FRETE:</span>
              <span>R$ {frete.toFixed(2)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
