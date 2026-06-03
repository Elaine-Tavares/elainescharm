import { useEffect } from 'react'
/*useLocation() retorna informações sobre a URL atual. Devolve um objeto tipo assim:
 {
  pathname: "/politica",
  search: "",
  hash: "",
  state: null,
  key: "xyz123"
} */
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
//pegando só o pathname, ou seja, o caminho da URL (ex: /, /produtos, /politica, etc).
const { pathname } = useLocation()

  useEffect(() => {
    /*comando nativo do JavaScript, que rola a tela até o topo da página, 
    x = 0 → início da horizontal, 
    y = 0 → início da vertical*/
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
