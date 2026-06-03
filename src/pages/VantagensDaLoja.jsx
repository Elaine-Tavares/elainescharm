
import Container from '../components/Container'
import SearchBar from '../components/SearchBar'
import styles from './VantagensDaLoja.module.css'
import selo from    '../assets/selo.webp'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'


export default function VantagensDaLoja() {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/
    const [imgs, setImgs] = useState([])
    const [msg, setMsg] = useState()
    const [valorDoUsuario, setValorDoUsuario] = useState('')
     const [carregando, setCarregando] = useState(false)

     const searchImgs = async () => {
      try {
        setCarregando(true)
        const response = await api.get('produtos.php'); {
          if(response.data.status === 'sucesso'){
            setImgs(response.data.dados);
            console.log(msg)
            // console.log("STATUS", response.data.status)
            // console.log("Imagens carregadas:", response.data.dados);
          }
        }   
      } catch (error) {
        console.error("Erro:", error);
        setMsg("Erro ao conectar com o servidor.")
      } finally {
        setCarregando(false)
      }
  };

    // Novo array com filtro aplicado
    const produtosFiltrados = imgs.filter((img) =>
     img.nome_do_produto.toLowerCase().includes(valorDoUsuario.toLowerCase())    
  )

  useEffect(() => {
      searchImgs()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

  return (
    <section>
      <Container>
        <Helmet>
          <title>Vantagens da Elaine's Charm | Maquiagem e Cosméticos de Qualidade</title>
          <meta
            name="description"
            content="Conheça as vantagens exclusivas da Elaine's Charm: produtos de alta qualidade, atendimento personalizado, entregas rápidas e segurança nas suas compras."
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <SearchBar
          inputDoUsuario={valorDoUsuario}
          setInputDoUsuario={(e) => setValorDoUsuario(e.target.value)}
        />
        {carregando && <div className='loader'></div>}

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
                       <img src={produto.imagem_do_produto} alt="Produto" />
                       <h2>{produto.nome_do_produto}</h2>
                       <p className={styles.preco}>
                         R$ {Number(produto.valor_do_produto).toFixed(2)}
                       </p>
                       <p className={styles.preco}>{produto.parcelamento_do_produto}</p>
                       <Link  to={`/produto_detalhes/${produto.id_do_produto}`} className={styles.cardLink}> <button className={styles.botaoComprar}>Ver Produto</button></Link>
                     </div>
                 ))}
               </div>
             )}
       
      
        <div className={styles.vantagensContainer}>
        <h2 className={styles.sub_titulo}>Por que escolher a Elaine’s Charm?</h2>

        <section className={styles.vantagem}>
          <h2>🌱 Cosméticos Naturais e Cruelty-Free</h2>
          <p>
            Nossos produtos são livres de crueldade animal, formulados com ingredientes naturais e seguros para sua pele.
          </p>
          <img src={selo} alt="Cruelty Free" className={styles.imagemVantagem} />
        </section>

        <section className={styles.vantagem}>
          <h2>🚚 Frete Grátis e Entrega Rápida</h2>
          <p>
            Frete gratuito para compras acima de R$99, com envio rápido e rastreamento garantido em todo o Brasil.
          </p>
        </section>

        <section className={styles.vantagem}>
          <h2>💳 Parcelamento Facilitado</h2>
          <p>
            Pague em até 6x sem juros no cartão de crédito, com total segurança e flexibilidade.
          </p>
        </section>

        <section className={styles.vantagem}>
          <h2>🛡️ Segurança e Qualidade</h2>
          <p>
            Todos os produtos são dermatologicamente testados e registrados na Anvisa, garantindo a sua segurança.
          </p>
        </section>

        <div className={styles.cta}>
          <p>Pronta para transformar sua rotina de beleza?</p>
          <Link to="/produtos" className={styles.botaoVantagens}>Ver Produtos</Link>
        </div>
      </div>
      </Container>
    </section>
  )
}
