import { Helmet } from 'react-helmet'
import Container from '../../src/components/Container'

export default function MinhaConta() {
  return (
    <Container>
      <Helmet>
        <title>Minha Conta | Elaine's Charm</title>
        <meta
          name="description"
          content="Gerencie seus dados pessoais, endereços e pedidos na sua conta Elaine's Charm. Tudo para facilitar sua experiência de compra em maquiagem e cosméticos."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div>MinhaConta</div>
    </Container>
  )
}
