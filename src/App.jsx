import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home';
import VantagensDaLoja from './pages/VantagensDaLoja';
import CriarConta from './pages/CriarConta';
import Entrar from './pages/Entrar';
import TermosDeUso from './pages/TermosDeUso';
import PoliticaDePrivacidade from './pages/PoliticaDePrivacidade'
import MinhaConta from './pages/MinhaConta';
import RotaProtegida from './components/RotaProtegida';
import MeuCarrinho from './pages/MeuCarrinho';
import Produtos from './pages/Produtos';
import ProdutoDetalhes from './pages/ProdutoDetalhes';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ScrollToTop from './components/ScrollToTop';
import Checkout from './pages/Checkout';

function App() {
  return ( 
      <BrowserRouter>
        <ToastContainer
          position="top-right"       // posição do toast
          autoClose={3000}           // fecha em 3 segundos
          hideProgressBar={false}    // barra de progresso visível
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"            // aplica cores por tipo (sucesso = verde, erro = vermelho, etc)
          toastStyle={{
          borderRadius: '12px',
          padding: '1rem',
          fontSize: '0.95rem',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',}} 
        />
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/produtos' element={<Produtos/>}/>
          <Route path='/vantagens' element={<VantagensDaLoja/>}/>
          <Route path='/criarConta' element={<CriarConta/>}/>
          <Route path='/entrar' element={<Entrar/>}/>
          <Route path='/termos' element={<TermosDeUso/>}/>
          <Route path='/politica' element={<PoliticaDePrivacidade/>}/>
          <Route path="/produto_detalhes/:id" element={<ProdutoDetalhes />} />

          {/* ROTAS PROTEGIDAS */}
          <Route 
            path="/minhaConta" 
            element={
              <RotaProtegida>
                <MinhaConta />
              </RotaProtegida>
            }
          />

            <Route 
            path="/meuCarrinho" 
            element={
              <RotaProtegida>
                <MeuCarrinho />
              </RotaProtegida>
            }
          />

            <Route 
            path="/comprar" 
            element={
              <RotaProtegida>
                <Checkout />
              </RotaProtegida>
            }
          />
        </Routes>
      </BrowserRouter>  
  )
}

export default App
