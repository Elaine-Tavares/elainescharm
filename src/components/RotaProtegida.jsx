import { Navigate } from 'react-router-dom'

export default function RotaProtegida({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuario_logado'))

  
  const logado = usuario?.logado === true


  return logado ? (children) : (<Navigate to="/entrar" />)
}
