import { Helmet } from 'react-helmet'
import Container from '../../src/components/Container'
import { useState, useEffect } from 'react'

export default function MinhaConta() {
    const usuario = JSON.parse(localStorage.getItem('usuario_logado'))

  
   //Detectar o estado inicial, se logado == false ou logado == true
    useEffect(() => {
      // Atualiza o estado se usuário estiver logado
      const usuario = JSON.parse(localStorage.getItem('usuario_logado'))
  }, [])

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
      <div>
        <h1>
          MinhaConta
        </h1> 

        {usuario ? (
          <span>Email: {usuario.email}</span>
        ) : (
          <span>Usuário não logado</span>
        )}
      </div>
    </Container>
  )
}
