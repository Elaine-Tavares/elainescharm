import Container from '../components/Container'
import api from '../services/api'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styles from  './Produtos.module.css'

export default function Produtos() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [imgs, setImgs] = useState([])
    const [valorDoUsuario, setValorDoUsuario] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)

    async function getProducts(){
      setLoading(true)
      try {
        const response = await api.get("produtos.php")
         if (response.status) {
        //exibe a mensagem de sucesso
        setProdutos(response.data.dados)
        console.log("RESPOSTA", response.data)
        }
      } catch (error) {
        console.log("ERROR", error)
      } finally{
        setLoading(false)
      }
    }

    useEffect(() => {
      getProducts()
    
    }, [])
    

    
    
  return (
      <Container >
        <Helmet>
          <title>Produtos | Elaine's Charm - Maquiagem e Cosméticos</title>
          <meta
            name="description"
            content="Explore nossa variedade de maquiagem e cosméticos de alta qualidade na Elaine's Charm. Encontre os melhores produtos para realçar sua beleza!"
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <SearchBar
          inputDoUsuario={valorDoUsuario}
          setInputDoUsuario={(e) => setValorDoUsuario(e.target.value)}   
        />
        {loading && <div className='loader'></div>}

        <h1 className={styles.titulo}>Nossos Produtos</h1>
         {/* {valorDoUsuario && produtosFiltrados.length === 0 && (
            <p className={styles.semResultados}>Nenhum produto encontrado com esse nome 😢</p>
        )} */}
        <div className={styles.produtosContainer}> 
          {produtos.map((produto) => (

        <div key={produto.id_do_produto} className={styles.cardProduto}>
          <h2>Produto: {produto.nome_do_produto}</h2>
          <p className={styles.preco}>Preço:  R$ {Number(produto.valor_do_produto).toFixed(2)}</p> 
          <img src={`http://localhost:8000/images/${produto.imagem_do_produto}`} 
                alt={produto.nome_do_produto}
                loading="lazy"
                width="300"
                height="300"
               />
               <Link  to={`/produto_detalhes/${produto.id_do_produto}`} className={styles.cardLink}> <button className={styles.botaoVer}>Ver Produto</button></Link>
        </div>
       ))}
       </div>

       
      </Container>
)
}