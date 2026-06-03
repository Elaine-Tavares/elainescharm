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
        {carregando && <div className='loader'></div>}

        <h1 className={styles.titulo}>Nossos Produtos</h1>
         {valorDoUsuario && produtosFiltrados.length === 0 && (
            <p className={styles.semResultados}>Nenhum produto encontrado com esse nome 😢</p>
        )}
        <div className={styles.produtosContainer}> 
          
       </div>
      </Container>
)
}