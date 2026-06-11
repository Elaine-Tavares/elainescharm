import logo from '../assets/logo.webp'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import styles from './Entrar.module.css'


export default function Entrar() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

  const navigate = useNavigate()
  // Estados para armazenar e-mail, senha e mensagem de erro ou sucesso.
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErr, setMensagemErr] = useState('');
  const [processando, setProcessando] = useState("")



  const handleLogar = async (e) => {
    e.preventDefault();
    setProcessando("Processando...")
    // Leva a janela ao topo do formulário
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Envia os dados para a API para verificar se o usuário existe
      const response = await api.post('dimitri_login.php', 
        { email, 
          senha 
      });
      
      // Verifica se o login foi bem-sucedido com base na resposta da API
      if (response.data.success) {
         // ✅ Aqui salvamos no localStorage
        const usuario = {
          logado: true,
          email: email,
        };

        localStorage.setItem('usuario_logado', JSON.stringify(usuario));
  
        // Navega para a página inicial ou qualquer outra página após login bem-sucedido
        navigate('/minhaConta'); // Substitua '/home' pela rota para a página de destino após login.
      } else {
        // Leva a janela ao topo do formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Se login falhar, exibe a mensagem de erro
        setMensagemErr(response.data.message);
        // apaga a mensagem de erro após 3s
        setTimeout(() => {
        setMensagemErr("") 
        }, 3000);
      }
    } catch (error) {
      // Leva a janela ao topo do formulário
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Em caso de erro de rede ou no servidor, exibe uma mensagem genérica
      setMensagemErr('Erro ao tentar efetuar login. Tente novamente mais tarde.', error);
      // apaga a mensagem de erro após 3s
      setTimeout(() => {
      setMensagemErr("") 
      }, 3000);
    } finally{
      setProcessando("")
    }
  }
 
  return (
    <section>
      <Helmet>
        <title>Entrar | Elaine's Charm</title>
        <meta name="description" content="Acesse sua conta na Elaine's Charm e acompanhe seus pedidos de maquiagem e cosméticos com facilidade." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className={styles.navbar}>
       <Link className={styles.container_logo} to="/">
         <img className={styles.logo} src={logo} alt="Logo do site" />
         <h3>Beleza que revela o seu charme</h3>
       </Link>
      </div>
      <div className={styles.form_entrar_conta}> 
        <h2>Preencha os dados para logar</h2>  
        {processando && <p className={styles.processando}>{processando}</p>}
        {mensagemErr && <p className={styles.mensagemErr}>{mensagemErr}</p> }
        <form onSubmit={handleLogar}>
         <div className={styles.div_form}>
          <label>Informe seu e-mail</label>
          <input 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            type="text" 
            placeholder='Você vai receber informações sobre sua conta.' 
          />
         </div> 
         <div className={styles.div_form}>
          <label>Senha</label>
          <input 
            onChange={(e)=> setSenha(e.target.value)}
            value={senha}
            type="password" 
            placeholder='Para manter sua conta protegida.' 
          />
         </div>
         <div className={styles.div_form}>
          <input type="submit" value="Entrar" />
         </div>
        </form> 
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Não tem uma conta?</p>
            <button className={styles.botaoCriarContaSecundario} onClick={() => navigate('/criarConta')}>
            Criar Conta
            </button>
        </div>  
      </div>
    </section>
  )
}
