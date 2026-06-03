import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Helmet } from "react-helmet"
import styles from './PoliticaDePrivacidade.module.css'

export default function Privacidade() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
  return (
    <section>
        <Helmet>
          <title>Política de Privacidade | Elaine's Charm</title>
          <meta
            name="description"
            content="Saiba como a Elaine's Charm protege seus dados pessoais e respeita sua privacidade em todas as compras e interações."
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <Header/>
            <div className={styles.container}>
      <h1>Política de Privacidade</h1>
      <p>Última atualização: 09/07/2025</p>

      <p>No <strong>Elaine’s Charm</strong>, respeitamos sua privacidade e estamos comprometidos com a proteção dos seus dados pessoais.</p>

      <h2>1. Coleta de Informações</h2>
      <p>Coletamos informações que você nos fornece, como nome, e-mail, telefone e dados de acesso, apenas para fins relacionados à sua experiência na plataforma.</p>

      <h2>2. Uso das Informações</h2>
      <p>Utilizamos suas informações para processar cadastros, melhorar nossos serviços, enviar atualizações e responder a solicitações.</p>

      <h2>3. Compartilhamento de Dados</h2>
      <p>Não vendemos, alugamos ou compartilhamos suas informações com terceiros, exceto quando exigido por lei ou para funcionamento essencial da plataforma.</p>

      <h2>4. Segurança</h2>
      <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>

      <h2>5. Seus Direitos</h2>
      <p>Você pode acessar, corrigir ou excluir seus dados a qualquer momento. Basta enviar uma solicitação para o nosso e-mail de contato.</p>

      <h2>6. Cookies</h2>
      <p>Utilizamos cookies para melhorar a navegação e personalizar sua experiência. Você pode desativá-los nas configurações do seu navegador.</p>

      <h2>7. Alterações nesta Política</h2>
      <p>Reservamo-nos o direito de atualizar esta política. Recomendamos a leitura periódica para estar ciente de eventuais mudanças.</p>

      <h2>8. Contato</h2>
      <p>Em caso de dúvidas, entre em contato pelo e-mail <a href="mailto:elainetavares.developer@gmail.com">elainetavares.developer@gmail.com</a>.</p>

      <Link to="/">Voltar à página inicial</Link>
    </div>
        <Footer/>
    </section >
  )
}
