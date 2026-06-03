import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Helmet } from "react-helmet"
import styles from './TermosDeUso.module.css'

export default function TermosDeUso() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
  return (
   <section>
      <Header/>
        <Helmet>
        <title>Termos de Uso | Elaine's Charm</title>
        <meta
          name="description"
          content="Confira os termos e condições para utilização da loja Elaine's Charm, incluindo direitos, deveres e responsabilidades dos usuários."
        />
        <meta name="robots" content="index, follow" />
     </Helmet>

      <div className={styles.container}>
      <h1>Termos de Uso</h1>
      <p>Última atualização: 09/07/2025</p>
      
      <p>
        Ao utilizar o site <strong>Elaine’s Charm</strong>, você concorda com os termos descritos abaixo.
        Caso não concorde com alguma parte destes termos, por favor, não continue usando a plataforma.
      </p>

      <h2>1. Uso da Plataforma</h2>
      <p>Você deve fornecer informações verdadeiras e manter sua conta segura. É proibido utilizar a plataforma para fins ilegais ou que violem os direitos de terceiros.</p>

      <h2>2. Propriedade Intelectual</h2>
      <p>Todo o conteúdo do site, incluindo imagens, textos e logotipo, é de propriedade do Elaine’s Charm. É proibida a reprodução sem autorização prévia.</p>

      <h2>3. Cancelamento ou Suspensão</h2>
      <p>Podemos suspender ou encerrar contas que violem estes termos, sem aviso prévio.</p>

      <h2>4. Alterações nos Termos</h2>
      <p>Os termos podem ser atualizados a qualquer momento. Recomendamos que você os revise periodicamente.</p>

      <h2>5. Contato</h2>
      <p>Em caso de dúvidas, entre em contato através do e-mail <a href="mailto:elainetavares.developer@gmail.com">elainetavares.developer@gmail.com</a>.</p>

      <Link to="/">Voltar à página inicial</Link>
    </div>
    <Footer/>
  </section>

    
  )
}
