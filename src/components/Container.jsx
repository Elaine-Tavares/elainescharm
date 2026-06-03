import Header from './Header'
import Footer from './Footer'
import styles from './Container.module.css'

export default function Container({children}) {
    /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

  return (
    <div className={styles.container}>
        <Header/> 
        {children}
        <Footer/>
    </div>
  )
}
