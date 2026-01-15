# 🗄️ Como Configurar o MongoDB

O MongoDB é o banco de dados necessário para o projeto funcionar. Você tem **duas opções**:

---

## 🌐 Opção 1: MongoDB Atlas (Recomendado - Mais Fácil)

MongoDB Atlas é um serviço na nuvem **GRATUITO**. É a opção mais fácil e não requer instalação local.

### Passo a Passo:

#### 1. Criar Conta no MongoDB Atlas
- Acesse: https://www.mongodb.com/cloud/atlas/register
- Clique em "Try Free" ou "Get started for free"
- Crie uma conta (pode usar Google, GitHub ou email)

#### 2. Criar um Cluster Gratuito
- Após fazer login, clique em "Build a Database"
- Escolha o plano **FREE** (M0 Sandbox)
- Escolha um provedor (AWS, Google Cloud ou Azure)
- Escolha uma região próxima (ex: São Paulo se estiver no Brasil)
- Dê um nome ao cluster (ex: "Cluster0")
- Clique em "Create"

#### 3. Configurar Acesso ao Banco
- **Criar usuário do banco:**
  - Vá em "Database Access" (menu lateral)
  - Clique em "Add New Database User"
  - Escolha "Password" como método de autenticação
  - Digite um nome de usuário (ex: "admin") e uma senha forte
  - **ANOTE a senha!** Você precisará dela
  - Deixe o privilégio como "Atlas admin"
  - Clique em "Add User"

- **Configurar acesso de IP:**
  - Vá em "Network Access" (menu lateral)
  - Clique em "Add IP Address"
  - Para desenvolvimento, você pode:
    - Clique em "Allow Access from Anywhere" (0.0.0.0/0) - **Mais fácil mas menos seguro**
    - Ou adicione seu IP atual clicando em "Add Current IP Address"
  - Clique em "Confirm"

#### 4. Obter a String de Conexão
- Volte para "Database" (menu lateral)
- Clique em "Connect" no seu cluster
- Escolha "Connect your application"
- Escolha "Node.js" como driver
- Copie a string de conexão que aparece (algo como):
  ```
  mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- **Substitua** `<username>` pelo usuário que você criou
- **Substitua** `<password>` pela senha que você criou
- **Adicione o nome do banco** antes do `?`: `/agendamentos-db?`

Exemplo final:
```
mongodb+srv://admin:MinhaSenha123@cluster0.xxxxx.mongodb.net/agendamentos-db?retryWrites=true&w=majority
```

#### 5. Configurar no Projeto
- Abra o arquivo `server/.env`
- Substitua a linha `MONGO_URI` pela string que você acabou de criar:

```env
MONGO_URI=mongodb+srv://seu-usuario:sua-senha@cluster0.xxxxx.mongodb.net/agendamentos-db?retryWrites=true&w=majority
JWT_SECRET=meu-secret-super-seguro-para-jwt-token-alterar-em-producao
PORT=3000
```

#### 6. Pronto! ✅
Agora você pode rodar o projeto e ele se conectará ao MongoDB Atlas automaticamente!

---

## 💻 Opção 2: MongoDB Local (Instalar no Computador)

Se preferir instalar o MongoDB diretamente no seu computador.

### Passo a Passo:

#### 1. Instalar MongoDB Community Edition
- **Windows:**
  - Acesse: https://www.mongodb.com/try/download/community
  - Escolha:
    - Version: Mais recente (ex: 7.0.x)
    - Platform: Windows
    - Package: MSI
  - Baixe e execute o instalador
  - Durante a instalação:
    - Marque "Install MongoDB as a Service"
    - Marque "Install MongoDB Compass" (interface gráfica - opcional mas recomendado)
    - Marque "Run service as Network Service user"
  - Clique em "Install"

#### 2. Verificar Instalação
- Abra um novo terminal PowerShell
- Execute:
  ```bash
  mongod --version
  ```
- Deve mostrar a versão do MongoDB

#### 3. Verificar se o Serviço Está Rodando
- No Windows, o MongoDB roda como um serviço automaticamente
- Para verificar:
  - Pressione `Win + R`
  - Digite `services.msc` e pressione Enter
  - Procure por "MongoDB Server"
  - Verifique se está "Em execução"

#### 4. Configurar no Projeto
- O arquivo `server/.env` já está configurado para MongoDB local:
```env
MONGO_URI=mongodb://localhost:27017/agendamentos-db
JWT_SECRET=meu-secret-super-seguro-para-jwt-token-alterar-em-producao
PORT=3000
```
- **Não precisa alterar nada!** Já está correto para MongoDB local.

#### 5. (Opcional) Instalar MongoDB Compass
- O Compass é uma interface gráfica para visualizar seus dados
- Se marcou durante a instalação, já está instalado
- Se não, baixe em: https://www.mongodb.com/try/download/compass
- Use para visualizar seus bancos e coleções

#### 6. Pronto! ✅
Agora você pode rodar o projeto!

---

## 🎯 Qual Opção Escolher?

| Característica | MongoDB Atlas (Nuvem) | MongoDB Local |
|---------------|----------------------|---------------|
| **Facilidade** | ⭐⭐⭐⭐⭐ Muito fácil | ⭐⭐⭐ Requer instalação |
| **Gratuito** | ✅ Sim (até 512MB) | ✅ Sim |
| **Precisa instalar?** | ❌ Não | ✅ Sim |
| **Funciona offline?** | ❌ Não (precisa internet) | ✅ Sim |
| **Configuração** | ⚙️ Mais simples | ⚙️ Mais complexa |
| **Recomendado para:** | Desenvolvimento e aprendizado | Desenvolvimento local intensivo |

**💡 Recomendação:** Se você é iniciante ou quer algo rápido, use **MongoDB Atlas**. É mais fácil e você não precisa instalar nada!

---

## ✅ Depois de Configurar

Após configurar o MongoDB (qualquer uma das opções), você pode:

1. **Iniciar o Backend:**
   ```bash
   cd server
   npm run dev
   ```
   
2. **Iniciar o Frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Acessar a aplicação:**
   - Abra o navegador em `http://localhost:5173`
   - Crie uma conta ou faça login
   - Comece a usar!

---

## 🔍 Verificar se Está Funcionando

### MongoDB Atlas:
- Se conectar sem erros ao iniciar o backend, está funcionando!
- Se aparecer "Servidor rodando" no console, tudo OK!

### MongoDB Local:
- Se o serviço MongoDB estiver rodando e o backend iniciar sem erros, está funcionando!
- Você pode usar o MongoDB Compass para verificar se o banco `agendamentos-db` foi criado

---

## ❓ Problemas Comuns

### "Cannot connect to MongoDB"
- **MongoDB Atlas:** Verifique se adicionou seu IP na whitelist e se a string de conexão está correta
- **MongoDB Local:** Verifique se o serviço MongoDB está rodando (services.msc)

### "Authentication failed"
- Verifique se o usuário e senha estão corretos na string de conexão
- No MongoDB Atlas, verifique se o usuário foi criado corretamente

### "Connection timeout"
- Verifique sua conexão com a internet (para Atlas)
- Verifique se o MongoDB local está rodando

---

**Precisa de ajuda? Me avise qual opção você escolheu e eu te ajudo a configurar!** 😊
