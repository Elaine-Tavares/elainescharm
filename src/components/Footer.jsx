import { Link } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa6"
import { Github, Linkedin, Mail, MessageCircle  } from 'lucide-react';
import styles from './Footer.module.css'


export default function Footer() {
    const anoAtual = new Date().getFullYear();
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

  return (
//     Termos de uso

// Política de privacidade

// Contato

// Redes sociais (se quiser simular ícones de Insta/Facebook)

    <footer className={styles.footer}>      
          <p className={styles.nome}>Desenvolvido com carinho por Elaine Tavares ©{anoAtual}</p>
          <div className={styles.info}>
            <div className={styles.info_texto}>
                <a
                href="mailto:contato@elainetavaresweb.com" target='blank'  rel="noopener noreferrer"
                title="Enviar um e-mail para Elaine Tavares"
                className={styles.email}
                >
                <Mail/>
                contato@elainetavaresweb.com
              </a>
              <p className={styles.textofooter}>
                Desenvolvedora Front-End <br/> HTML | CSS | JavaScript | React | PHP | MySQL | SEO | GitHub
              </p>
            </div>
            <nav className={styles.links} aria-label="Links para redes sociais">
            <a
              href="https://github.com/Elaine-Tavares"
              target="_blank"
              rel="noopener noreferrer"
              title="Acessar o GitHub de Elaine Tavares"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com/in/elaine-tavares-b5797b1b0"
              target="_blank"
              rel="noopener noreferrer"
              title="Acessar o LinkedIn de Elaine Tavares"
            >
              <Linkedin />
            </a>
            <a
              href="https://wa.link/b9mkmm"
              target="_blank"
              rel="noopener noreferrer"
              title="Enviar um whatsapp para Elaine Tavares"
            >
            <MessageCircle />
            </a>
          </nav>
        </div>     
    </footer>
  )
}
