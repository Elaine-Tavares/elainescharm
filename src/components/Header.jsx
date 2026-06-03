import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'
import styles from './Header.module.css'
import { useNavigate, useLocation  } from 'react-router-dom'
import { useState } from 'react'
import btnMobile from '../assets/btn_mobile.webp'
import { FaSignInAlt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { useEffect } from 'react'


export default function Header() {
   /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [isOpen, setIsOpen] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [logado, setLogado] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const rotaAtual = location.pathname
   

    const handleMenu = () =>{
     setIsOpen(!isOpen)
     setOverlay(!overlay)
  }

    //Detectar o estado inicial, se logado == false ou logado == true
    useEffect(() => {
      // Atualiza o estado se usuário estiver logado
      const usuarioLogado = localStorage.getItem('usuarioLogado') === 'true'
      setLogado(usuarioLogado)
      console.log(usuarioLogado)
  }, [])

    const handleLogout = () => {
      localStorage.removeItem('usuarioLogado')
      setLogado(false)
      console.log('Após logout:', localStorage.getItem('usuarioLogado')) // Deve dar null
      navigate('/')   
}


  return (
    <header >
      <div className={styles.navbar}>
          <Link className={styles.container_logo} to="/">
              <img className={styles.logo} src={logo} alt="Logo do site" />
              <h3>Beleza que revela o seu charme</h3>
          </Link>
          <div className={styles.mobile_menu} onClick={handleMenu}>
            <img className={styles.btn_mobile} src={btnMobile} alt="botaoMobile" />
          </div>
          <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}  onClick={handleMenu}>
            <nav className={`${styles.nav_links} ${isOpen ? styles.open : ""}`}>
              <h1 className={styles.mobile_close} onClick={handleMenu}>X</h1>
              <Link 
                
                className={`${styles.link_home} ${rotaAtual  === "/" ? styles.active : ""}`} 
                to="/">Home
              </Link>
              <Link 
              
                className={`${styles.link_produtos} ${rotaAtual  === "/produtos" ? styles.active : ""}`}  
                to="/produtos">Produtos
              </Link>
              <Link 
                
                className={`${styles.link_vantagens} ${rotaAtual  === "/vantagens" ? styles.active : ""}`} 
                to="/vantagens">Vantagens
              </Link>
                {!logado && (
                  <Link 
                    className={`${styles.link_criarConta} ${rotaAtual  === "/criarConta" ? styles.active : ""}`}  
                    to="/criarConta">Criar Conta
                  </Link>
                )}

                {logado && (
                  <Link  
                    className={`${styles.link_minhaConta} ${rotaAtual  === "/minhaConta" ? styles.active : ""}`}
                    to="/minhaConta"
                  >
                    Minha Conta
                  </Link>)}
              
                {!logado && (
                  <Link 
                    className={`${styles.link_entrar} ${rotaAtual  === "/entrar" ? styles.active : ""}`} 
                    to="/entrar">
                    Entrar <FaSignInAlt />
                  </Link>
              )}

                {logado && (
                  <Link to="/meuCarrinho" className={`${styles.link_meuCarrinho} ${rotaAtual  === "/meuCarrinho" ? styles.active : ""}`}>
                    Carrinho <FaCartArrowDown />
                  </Link>
              )}
                {logado && (
                  <Link
                    onClick={() => { 
                      handleLogout()
                    }}
                    className={styles.link_sair}
                    to="/"
                  >
                    Sair <FaSignInAlt />
                  </Link>
            )}
            </nav> 
          </div>   
      </div>   
    </header>
  )
}
