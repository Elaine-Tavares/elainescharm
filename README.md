🛠️ Tecnologias do Projeto
Frontend (React):

    React: Biblioteca principal para a construção da interface

    React Router DOM: Para gerenciar as rotas do front-end

    Axios: Para consumir a API (enviar e receber dados do back-end)

    React Hook Form + Yup: Para formulários e validações

    TailwindCSS (ou CSS Modules): Para estilização rápida e responsiva

    Recharts (opcional): Para gráficos de vendas ou estoque, caso queira adicionar um dashboard

Backend (PHP + MySQL):

    PHP 7.4+: Para criar a API e lógica de negócios

    MySQL: Banco de dados relacional para armazenar informações de usuários, produtos e pedidos

    PHPMyAdmin (opcional): Para gerenciar o banco de dados

    Slim Framework (opcional): Para facilitar a criação das rotas da API em PHP

    JWT (JSON Web Token) (opcional): Para autenticação do usuário via tokens

    Composer: Para gerenciar dependências do PHP, caso utilize algum framework ou biblioteca

    _____________________________

    ### Frontend (React)
- `public/`: Arquivos públicos (favicon, index.html)
- `src/`: Código fonte do React
  - `components/`: Componentes reutilizáveis (Header, Footer, ProductCard)
  - `pages/`: Páginas principais (Home, Login, Produto, Carrinho)
  - `services/`: Funções de API (Axios para chamar a API PHP)
  - `context/`: Context API para gerenciar estado global (ex: carrinho de compras)
  - `App.jsx`: Componente principal
  - `index.js`: Ponto de entrada da aplicação React


  ### Backend (PHP + MySQL)
- `api/`: Endpoints da API
  - `products.php`: Endpoint para manipular produtos
  - `orders.php`: Endpoint para pedidos
  - `users.php`: Endpoint para usuários
- `config/`: Configurações do banco de dados
  - `db.php`: Conexão com MySQL
- `.htaccess`: Regras de reescrita (caso esteja usando Apache)
- `index.php`: Ponto de entrada da API
- `composer.json`: Dependências do PHP


### 🛠️ Ferramentas Utilizadas
- **PHPMailer**: Para envio de e-mails de confirmação de conta via SMTP.
<!-- - **Debounce (função personalizada)**: Utilizada para otimizar o desempenho da busca de produtos, evitando múltiplas requisições seguidas. -->
- **React Toastify**: Para exibição de notificações elegantes (sucesso, erro, avisos).


-----------------------------ORIENTAÇÕES PARA O DESENVOLVEDOR--------------------------------------
📁 Estrutura de pastas recomendada para projetos React
/src
│
├── /assets          → imagens, ícones, fontes
├── /components      → botões, navbar, footer, formulários reutilizáveis
├── /pages           → cada rota do app (ex: Home, Entrar, CriarConta, Produtos...)
├── /services        → chamadas de API (ex: api.js)
├── /hooks           → custom hooks, se usar
├── /context         → arquivos de contexto global (ex: AuthContext)
├── /styles          → se você tiver CSS global ou variáveis
├── App.jsx
└── main.jsx


 /*Ao ler um componente, um desenvolvedor espera encontrar:
    1 - Primeiro: os estados (useState)
    2 - Depois: os efeitos colaterais (useEffect)
    3 - Em seguida: as funções internas
    4 - Por fim: o retorno do JSX*/

