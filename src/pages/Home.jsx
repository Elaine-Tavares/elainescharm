import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import HeroCarousel from '../components/HeroCarousel'
import selo from '../assets/selo.webp'
import SearchBar from '../components/SearchBar'
import { useEffect, useState } from 'react'
import api from '../services/api.js'
import { Helmet } from 'react-helmet'
import styles from './Home.module.css'


export default function Home() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguid_do_produtoa: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [imgs, setImgs] = useState([])
    const [valorDoUsuario, setValorDoUsuario] = useState("")
    const [ativado, setAtivado] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
      const params = new URLSearchParams(location.search)
          console.log("PARAMS", params)
      if (params.get('sucesso') === '1') {
        setMensagem('Conta ativada com sucesso! Clique no botão abaixo para logar.')
        setAtivado(true) // ← agora o estado foi alterado

        // Limpa a mensagem depois de 5 segundos (opcional)
        // setTimeout(() => setMensagem(''), 5000)
      }
    }, [location])
    
    const searchObjects = async () => {   

    try {
      const response = await api.get('produtos.php')
      // sucesso 
      if (response.status) {
        //exibe a mensagem de sucesso
        setImgs(response.data.dados)
        console.log("DADOS", response.data.dados)
        return;
      
        } else {
         console.error("Erro ao carregar imagens", response.status)    
          return;
      }
    } catch (error) {
      console.error("Erro ao carregar imagens, catch", error)
      return;
    } 
  }

  useEffect(() => {
    searchObjects()
  }, [valorDoUsuario])
  

    // Novo array com filtro aplicado
  //   const produtosFiltrados = imgs.filter((img) =>
  //    img.nome_do_produto.toLowerCase().includes(valorDoUsuario.toLowerCase())    
  // )
  
  return (
    <Container>
      <Helmet>
        <title>Elaine's Charm | Maquiagem e cosméticos para realçar sua beleza</title>
        <meta
          name="description"
          content="Conheça a Elaine's Charm, sua loja online de maquiagem e cosméticos. Produtos de qualidade para destacar sua beleza com estilo, cuidado e autenticidade."
        />
      </Helmet>
              {ativado && (
      <div className={styles.mensagemAtivacao}>
        <p >{mensagem}</p>
        <button className={styles.botaoLogar} onClick={() => navigate('/entrar')}>
          Logar
        </button>
      </div>
    )}
    <SearchBar
      inputDoUsuario={valorDoUsuario}
      setInputDoUsuario={(e) => setValorDoUsuario(e.target.value)}
    />  
    {valorDoUsuario && (
      <div className={styles.produtosContainer}>
        <h1 className={styles.titulo}>Nossos Produtos</h1>
            {valorDoUsuario && produtosFiltrados.length === 0 && (
            <p className={styles.semResultados}>Nenhum produto encontrado com esse nome 😢</p>
        )}
        {produtosFiltrados.map((produto) => (
          <div
            key={produto.id_do_produto}
            name={produto.categoria_do_produto}
            className={styles.cardProduto}
          >
         
            <h2>{produto.nome_do_produto}</h2>
            <p className={styles.preco}>
              R$ {Number(produto.valor_do_produto).toFixed(2)}
            </p>
            <p className={styles.preco}>{produto.parcelamento_do_produto}</p>
            <Link  to={`/produto_detalhes/${produto.id_do_produto}`} className={styles.cardLink}> <button className={styles.botaoVer}>Ver Produto</button></Link>
        </div>
    ))}
     </div>
)}

    <div className={styles.homeContainer}>
      {/* Hero */}
      <HeroCarousel/>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Beleza com propósito</h1>
          <p>Cosméticos que revelam o seu charme natural</p>
          <Link to="/produtos" className={styles.btnHero}>Ver Produtos</Link>
        </div>
      </section>
      {/* Benefícios */}
      <section className={styles.benefits}>
        <div className={styles.benefitCard}>
          <h3>🚚 Frete Grátis</h3>
          <p>Para compras acima de R$99</p>
        </div>
        <div className={styles.benefitCard}>
          <h3>💳 Parcelamento</h3>
          <p>Em até 6x sem juros</p>
        </div>
        <div className={styles.benefitCard}>
          <h3>🌿 Testado e seguro</h3>
          <p>Produtos dermatologicamente testados</p>
        </div>
      </section>

      {/* Sobre */}
      <section className={styles.about}>
        <h2>Sobre a Elaine’s Charm</h2>
        <p>
          A Elaine’s Charm nasceu do amor pelos cuidados com a pele e a autoestima. 
          Oferecemos cosméticos de alta qualidade, cruelty-free e com preços justos.
        </p>
      </section>

      {/* Destaques de produtos ou categorias */}
      <section className={styles.highlights}>
        <h2>Conheça nossos destaques</h2>
        <div className={styles.cardsContainer}>
          {imgs.slice(0, 5).map((img) => 
            <div className={styles.card}>
              <img src={`http://localhost:8000/images/${img.imagem_do_produto}`} 
                alt={img.nome_do_produto}
                loading="lazy"
                width="300"
                height="300"
               />
            <h4>{img.nome_do_produto}</h4>
            <Link  to={`/produto_detalhes/${img.id_do_produto}`} className={styles.cardLink}><button className={styles.botaoVer}>Ver Produto</button></Link>
          </div>
          )}
        </div>
      </section>

      <section className={styles.crueltyFreeSection}>
        <img 
          src={selo} 
          alt="Produto Cruelty-Free"
          className={styles.crueltyIcon}
        />
        <p>Produtos livres de crueldade animal. Amor à beleza e à vida. 🐇</p>
      </section>

      {/* Chamada para criar conta */}
      <section className={styles.cta}>
        <h2>💌 Quer ofertas exclusivas?</h2>
        <p>Crie sua conta grátis e receba novidades direto no seu e-mail</p>
        <div className={styles.ctaButtons}>
          <Link to="/criarConta" className={styles.btnPrimary}>Criar Conta</Link>
          <Link to="/entrar" className={styles.btnSecondary}>Entrar</Link>
        </div>
      </section>
    </div>
  </Container>
  )
}
