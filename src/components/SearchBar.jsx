import styles from './SearchBar.module.css';
import { BsSearchHeart } from "react-icons/bs";

export default function SearchBar({color, inputDoUsuario, setInputDoUsuario, buscarProduto}) {
  /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

  console.log("input do usuario", inputDoUsuario)
  return (
    <div 
      className={styles.search_bar}>
        <div className={styles.input_container}>
          <input 
          type="text" 
          placeholder="Buscar produto..."
          value={inputDoUsuario}
          onChange={setInputDoUsuario}
      />
        <div style={{background:`${color}`}} className={styles.container_lupa} onClick={buscarProduto}>
          <BsSearchHeart className={styles.lupa} />
        </div> 
      </div>        
    </div>
  )
}
