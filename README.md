# Projeto Full Stack - Sistema de Agendamentos

Aplicação web completa desenvolvida com Node.js, Express, MongoDB, React e React Router, seguindo os princípios de arquitetura MVC e boas práticas de segurança.

## 🏗️ Arquitetura

### Backend (API)
- **Framework**: Node.js + Express
- **Banco de Dados**: MongoDB com Mongoose
- **Arquitetura**: MVC (Model, View*, Controller)
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: bcrypt para hash de senhas
- **Validação**: Joi para validação de entrada

### Frontend (SPA)
- **Framework**: React
- **Roteamento**: React Router DOM
- **HTTP Client**: Axios
- **Gestão de Estado**: Context API
- **Estilização**: CSS puro com variáveis CSS

## ✨ Funcionalidades

### Autenticação e Autorização
- ✅ Sistema de registro e login
- ✅ Hash de senhas com bcrypt
- ✅ Autenticação via JWT
- ✅ Controle de acesso (Admin e Usuário Comum)
- ✅ Proteção de rotas no frontend e backend

### CRUD Completo
- ✅ **Create**: Criar agendamentos
- ✅ **Read**: Listar agendamentos (usuários veem apenas os seus, admins veem todos)
- ✅ **Update**: Atualizar agendamentos (implementado no backend)
- ✅ **Delete**: Deletar agendamentos

### Validação
- ✅ Validação no backend com Joi
- ✅ Validação nos modelos Mongoose
- ✅ Validação no frontend
- ✅ Mensagens de erro claras

### UX/UI
- ✅ Interface responsiva (Desktop e Mobile)
- ✅ Feedback de carregamento (spinners)
- ✅ Feedback de erros
- ✅ Design moderno e limpo

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## 🚀 Como executar

### 1. Configurar o Backend

```bash
cd server
npm install
```

Crie um arquivo `.env` na pasta `server` com as seguintes variáveis:

```env
MONGO_URI=mongodb://localhost:27017/nome-do-banco
JWT_SECRET=seu-secret-super-seguro-aqui
PORT=3000
```

Execute o servidor:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 2. Configurar o Frontend

```bash
cd client
npm install
```

Execute o frontend:

```bash
npm run dev
```

O frontend estará rodando (geralmente em `http://localhost:5173` ou `http://localhost:3001`)

## 📁 Estrutura do Projeto

```
projeto-fullstack/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Configuração do MongoDB
│   │   ├── controllers/
│   │   │   ├── authController.js  # Lógica de autenticação
│   │   │   └── agendamentoController.js # Lógica de agendamentos
│   │   ├── middlewares/
│   │   │   └── auth.js            # Middlewares de autenticação
│   │   ├── models/
│   │   │   ├── User.js            # Modelo de Usuário
│   │   │   └── Agendamento.js     # Modelo de Agendamento
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Rotas de autenticação
│   │   │   └── agendamentoRoutes.js # Rotas de agendamentos
│   │   ├── validators/
│   │   │   ├── authValidator.js   # Validação de autenticação
│   │   │   └── agendamentoValidator.js # Validação de agendamentos
│   │   └── server.js              # Arquivo principal do servidor
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/            # Componentes reutilizáveis
    │   ├── contexts/
    │   │   └── AuthContext.jsx    # Context de autenticação
    │   ├── pages/
    │   │   ├── Login.jsx          # Página de login
    │   │   ├── Register.jsx       # Página de registro
    │   │   └── Agendamentos.jsx   # Página de agendamentos
    │   ├── services/
    │   │   └── api.js             # Configuração do Axios
    │   ├── App.jsx                # Componente principal
    │   ├── main.jsx               # Entry point
    │   └── index.css              # Estilos globais
    └── package.json
```

## 🔐 Níveis de Acesso

### Usuário Comum (role: "user")
- Pode criar seus próprios agendamentos
- Pode ver apenas seus próprios agendamentos
- Pode atualizar e deletar apenas seus próprios agendamentos

### Administrador (role: "admin")
- Pode criar agendamentos
- Pode ver TODOS os agendamentos
- Pode atualizar e deletar qualquer agendamento

## 🛡️ Segurança Implementada

1. **Hash de Senhas**: Todas as senhas são hasheadas com bcrypt antes de serem armazenadas
2. **JWT**: Tokens JWT com expiração de 7 dias
3. **Validação de Entrada**: Validação tanto no frontend quanto no backend
4. **Proteção de Rotas**: Middleware de autenticação em todas as rotas protegidas
5. **Controle de Acesso**: Verificação de roles para operações sensíveis
6. **Sanitização**: Validação de tipos e formatos de dados

## 📝 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Agendamentos
- `POST /api/agendamentos` - Criar agendamento (autenticado)
- `GET /api/agendamentos` - Listar agendamentos (autenticado)
- `GET /api/agendamentos/:id` - Buscar agendamento por ID (autenticado)
- `PUT /api/agendamentos/:id` - Atualizar agendamento (autenticado)
- `DELETE /api/agendamentos/:id` - Deletar agendamento (autenticado)

## 🎨 Tecnologias Utilizadas

### Backend
- Express.js
- MongoDB / Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Joi
- CORS
- dotenv

### Frontend
- React
- React Router DOM
- Axios
- Context API

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
