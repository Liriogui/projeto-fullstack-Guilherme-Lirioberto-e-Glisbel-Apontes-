# 🚀 Como Iniciar o MongoDB Local

Como você tem o **MongoDB Compass** instalado, significa que o MongoDB está instalado no seu computador. Agora só precisa iniciá-lo!

---

## ✅ Opção 1: Verificar se o Serviço MongoDB Está Rodando

### Passo 1: Abrir o Gerenciador de Serviços do Windows

1. Pressione `Win + R` (tecla Windows + R)
2. Digite: `services.msc`
3. Pressione Enter

### Passo 2: Procurar pelo Serviço MongoDB

Na lista de serviços, procure por:
- **MongoDB Server (MongoDB)**
- Ou qualquer serviço com "Mongo" no nome

### Passo 3: Iniciar o Serviço (se estiver parado)

1. Clique com o botão direito no serviço MongoDB
2. Se estiver "Parado", clique em **"Iniciar"**
3. Aguarde alguns segundos até o status mudar para **"Em execução"**

**✅ Pronto!** Se o serviço estiver "Em execução", o MongoDB está rodando!

---

## ✅ Opção 2: Verificar pelo MongoDB Compass

### Passo 1: Abrir o MongoDB Compass

1. Abra o **MongoDB Compass** (procure no menu Iniciar)

### Passo 2: Tentar Conectar

1. No Compass, você verá uma string de conexão
2. A string padrão é: `mongodb://localhost:27017`
3. Clique em **"Connect"** (Conectar)

### Passo 3: Se Conectar com Sucesso

- ✅ Se o Compass conectar, significa que o **MongoDB está rodando!**
- ❌ Se der erro de conexão, o MongoDB não está rodando (veja Opção 1 ou 3)

---

## ✅ Opção 3: Iniciar o MongoDB Manualmente (se as outras não funcionarem)

Se o MongoDB não estiver como serviço, você pode iniciá-lo manualmente:

### Passo 1: Encontrar o Caminho do MongoDB

Normalmente está em:
- `C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe`
- Ou `C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe`

### Passo 2: Abrir um Terminal como Administrador

1. Clique com botão direito no PowerShell ou CMD
2. Escolha "Executar como administrador"

### Passo 3: Iniciar o MongoDB

Execute o comando (ajuste o caminho se necessário):

```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
```

**Nota:** Você precisa criar a pasta `C:\data\db` antes, ou usar outro caminho para os dados.

---

## 🔧 Configuração do Projeto

Depois que o MongoDB estiver rodando, você precisa garantir que o arquivo `.env` está configurado corretamente:

### Verificar o arquivo `server/.env`

Abra o arquivo `server/.env` e verifique se tem:

```env
MONGO_URI=mongodb://localhost:27017/agendamentos-db
JWT_SECRET=meu-secret-super-seguro-para-jwt-token-alterar-em-producao
PORT=3000
```

**Se o arquivo estiver assim, já está correto para MongoDB local!** ✅

---

## ✅ Testar se Está Funcionando

### Teste 1: Via MongoDB Compass
1. Abra o Compass
2. Conecte em `mongodb://localhost:27017`
3. Se conectar, está funcionando!

### Teste 2: Via Terminal
Execute no PowerShell:
```bash
mongosh
```
Se abrir o shell do MongoDB, está funcionando!

### Teste 3: Rodar o Backend
1. Abra um terminal na pasta `server`
2. Execute: `npm run dev`
3. Se aparecer "Servidor rodando" e **não der erro de conexão**, está funcionando!

---

## 🎯 Resumo Rápido

1. ✅ Abra o **Gerenciador de Serviços** (`services.msc`)
2. ✅ Procure por **"MongoDB"** na lista
3. ✅ Se estiver "Parado", clique em **"Iniciar"**
4. ✅ Verifique se o arquivo `server/.env` está correto
5. ✅ Teste abrindo o **MongoDB Compass** e conectando
6. ✅ Agora pode rodar o backend!

---

## ❓ Ainda Não Funciona?

- Verifique se o MongoDB foi instalado corretamente
- Tente reinstalar o MongoDB Community Edition
- Ou use MongoDB Atlas (nuvem) como alternativa - veja `CONFIGURAR_MONGODB.md`

---

**Precisa de ajuda? Me avise o que aconteceu quando você tentou iniciar!** 😊
