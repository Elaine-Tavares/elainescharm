import { useEffect, useState } from 'react'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import { imageBaseURL } from '../services/api'
import styles from './MeuCarrinho.module.css'

export default function MeuCarrinho() {
  const [produtos, setProdutos] = useState([])
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState("")
  const [uf, setUf] = useState("")
  const [localidade, setLocalidade] = useState("'")
  const [frete, setFrete] = useState(null)
  const [erroCep, setErroCep] = useState(null)

   // Carrega o carrinho do localStorage ao abrir a página
  useEffect(() => {
      const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || []
      setProdutos(carrinhoSalvo)
      console.log("PRODUTOS", produtos)
  }, [])

  useEffect(() => {   
  console.log("PRODUTOS ATUALIZADOS APÓS EFEITO COLATERAL:", produtos)
}, [produtos])


//Adicionar ao carrinho
const adicionar = (id) => {
  const atualizado = produtos.map((p) =>
    p.id_do_produto === id ? { ...p, quantidade: p.quantidade + 1 } : p
  )
  setProdutos(atualizado)
}

//remover produto
const remover = (id) => {
  const atualizado = produtos
    .map((p) =>
      p.id_do_produto === id
        ? { ...p, quantidade: p.quantidade - 1 }
        : p
    )
    .filter((p) => p.quantidade > 0)
    setProdutos(atualizado)
}

// Calcula o subtotal dos produtos no carrinho.
// Para cada produto, multiplica o valor unitário pela quantidade e soma ao total.
// O valor_do_produto vem como string, por isso usamos parseFloat para converter em número.
const calcularSubtotal = () => {
  return produtos.reduce(
    (total, p) => total + parseFloat(p.valor_do_produto) * p.quantidade,
    0 // valor inicial da soma
  )
}


  const calcularFrete = async () => {
    if (cep.length !== 8) {
      setErroCep('Digite um CEP válido com 8 números.')
      setFrete(null)
      return
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        setErroCep('CEP não encontrado.')
        setFrete(null)
        return
      }

      setErroCep(null)

      setUf(data.uf)
      setLocalidade(data.localidade)
      setLogradouro(data.logradouro)
      let valorFrete = 0
      if (data.uf === 'RJ') valorFrete = 10.90
      else if (data.uf === 'SP') valorFrete = 14.50
      else valorFrete = 19.99

      setFrete(valorFrete)
      
      // salva o frete separado
      localStorage.setItem('frete', JSON.stringify(valorFrete))

    } catch (err) {
      setErroCep('Erro ao consultar o CEP.', err)
      setFrete(null)
    }
  }


//calcular total
const calcularTotal = () => {
  const subtotal = calcularSubtotal()
  return frete ? (subtotal + frete).toFixed(2) : subtotal.toFixed(2)
}
  

  return (
    <Container>
      <Helmet>
  <title>Meu Carrinho | Elaine's Charm</title>
  <meta
    name="description"
    content="Veja os produtos de maquiagem e cosméticos que você adicionou ao carrinho. Revise seus itens antes de finalizar sua compra na Elaine's Charm."
  />
  <meta name="robots" content="noindex, nofollow" />
</Helmet>

      <div className={styles.container}>
        <h1>Meu Carrinho</h1>

        {produtos.length === 0 ? (
          <p className={styles.carrinho_vazio}>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className={styles.listaProdutos}>
              {produtos.map((p) => (
                <div key={p.id_do_produto} className={styles.item}>
                  {/* <img src={`${imageBaseURL}${p.imagem_do_produto}`} alt={p.nome_do_produto} /> */}
                  <div>
                    <h2>{p.nome_do_produto}</h2>
                    <h4>{p.descricao_do_produto}</h4>
                    <p>R$ {parseFloat(p.valor_do_produto).toFixed(2)}</p>
                    <p>{p.parcelamento_do_produto}</p>
                  </div>
                  <div className={styles.quantidade}>
                    <button onClick={() => adicionar(p.id_do_produto)}>+</button>
                    <span>{p.quantidade}</span>
                    <button onClick={() => remover(p.id_do_produto)}>-</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.frete}>
              <h3>Calcular Frete</h3>
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                maxLength={8}
              />
              <button onClick={calcularFrete}>Calcular</button>
              {erroCep && <p className={styles.erro}>{erroCep}</p>}
              {frete !== null && 
                <div>
                  <p>{localidade} - {uf}</p>
                  <p>{logradouro}</p>
                  <p className={styles.valorFrete}>Frete: R$ {frete.toFixed(2)}</p>
                </div>
              }
              
            </div>

            <div className={styles.total}>
              <p><strong>Subtotal:</strong> R$ {calcularSubtotal().toFixed(2)}</p>
              <p style={{marginBottom: "20px"}}><strong>Total:</strong> R$ {calcularTotal()}</p>
              <Link to="/comprar" className={styles.btn_comprar}>Comprar</Link>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
