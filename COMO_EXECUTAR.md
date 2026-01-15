# 🚀 Como Executar o Projeto

## ⚠️ Pré-requisitos

Certifique-se de ter instalado:
1. **Node.js** (v16 ou superior) - [Download aqui](https://nodejs.org/)
2. **MongoDB** - Instale localmente ou use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)

## 📝 Passo 1: Configurar o Arquivo .env

Crie um arquivo `.env` na pasta `server/` com o seguinte conteúdo:

```env
MONGO_URI=mongodb://localhost:27017/agendamentos-db
JWT_SECRET=meu-secret-super-seguro-para-jwt-token-alterar-em-producao
PORT=3000
```

**Nota:** Se estiver usando MongoDB Atlas, substitua `MONGO_URI` pela string de conexão fornecida pelo Atlas.

## 📦 Passo 2: Instalar Dependências do Backend

Abra um terminal na pasta `server` e execute:

```bash
npm install
```

Isso instalará todas as dependências do backend, incluindo:
- express
- mongoose
- bcrypt
- jsonwebtoken
- joi
- cors
- dotenv

## 📦 Passo 3: Instalar Dependências do Frontend

Abra outro terminal na pasta `client` e execute:

```bash
npm install
```

Isso instalará todas as dependências do frontend, incluindo:
- react
- react-dom
- react-router-dom
- axios
- vite
- @vitejs/plugin-react

## 🗄️ Passo 4: Iniciar o MongoDB

Se estiver usando MongoDB local, certifique-se de que o serviço está rodando:

```bash
# No Windows (se instalado como serviço, já estará rodando)
# Ou use:
mongod
```

Se estiver usando MongoDB Atlas, não precisa fazer nada, apenas certifique-se de que a string de conexão no `.env` está correta.

## 🚀 Passo 5: Executar o Backend

No terminal da pasta `server`, execute:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

Você verá a mensagem: `Servidor rodando` quando tudo estiver OK.

## 🚀 Passo 6: Executar o Frontend

Em **outro terminal**, na pasta `client`, execute:

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173` (ou outra porta se 5173 estiver ocupada).

## ✅ Testando a Aplicação

1. Abra o navegador em `http://localhost:5173`
2. Crie uma conta nova ou faça login
3. Teste criar agendamentos
4. Se criar um usuário com `role: "admin"` no banco, você terá acesso a todos os agendamentos

## 🔧 Troubleshooting

### Erro: "Cannot connect to MongoDB"
- Verifique se o MongoDB está rodando
- Verifique se a string de conexão no `.env` está correta
- Se usar MongoDB Atlas, verifique o IP whitelist e credenciais

### Erro: "Port already in use"
- Altere a `PORT` no arquivo `.env` do servidor
- Ou mate o processo que está usando a porta

### Erro: "npm não é reconhecido"
- Instale o Node.js do site oficial
- Reinicie o terminal após instalar
- Verifique se Node.js está no PATH do sistema

### Erro no frontend: "Cannot connect to API"
- Verifique se o backend está rodando
- Verifique a URL da API em `client/src/services/api.js`
- Certifique-se de que o CORS está configurado no backend (já está!)

## 📚 Comandos Úteis

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar se MongoDB está rodando (Windows)
# Abra o Task Manager e procure por mongod.exe
```
