import { Navigate } from 'react-router-dom'

export default function RotaProtegida({ children }) {
  const logado = localStorage.getItem('usuarioLogado') === 'true'

  return logado ? children : <Navigate to="/entrar" />
}
