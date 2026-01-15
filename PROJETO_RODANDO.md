# ✅ Projeto em Execução!

## 🎉 Status

O projeto foi iniciado! Você deve ver duas janelas do PowerShell abertas:

1. **Terminal do Backend** (servidor Node.js)
2. **Terminal do Frontend** (servidor Vite/React)

---

## 🌐 Como Acessar

### Frontend (Interface do Usuário)
Abra seu navegador e acesse:
**http://localhost:5173**

(ou a porta que aparecer no terminal do frontend)

### Backend (API)
A API está rodando em:
**http://localhost:3000/api**

---

## 📋 Próximos Passos

### 1. Criar uma Conta
1. Acesse http://localhost:5173
2. Clique em "Criar conta"
3. Preencha:
   - Nome completo
   - Email
   - Senha (mínimo 6 caracteres)
   - Confirme a senha
4. Clique em "Criar Conta"

### 2. Fazer Login
1. Use o email e senha que você criou
2. Clique em "Entrar"

### 3. Usar a Aplicação
- Você verá a página de **Agendamentos**
- Clique em **"+ Novo Agendamento"**
- Preencha:
  - Data e hora (deve ser futura)
  - Serviço (ex: "Consulta médica", "Corte de cabelo")
- Clique em "Salvar"

### 4. Testar Funcionalidades Admin (Opcional)
Para testar permissões de admin:
1. Você precisa criar um usuário com `role: "admin"` diretamente no banco
2. Ou modificar o código temporariamente para criar usuários como admin
3. Admins podem ver TODOS os agendamentos, não apenas os próprios

---

## 🔍 Verificar se Está Funcionando

### Backend está OK se:
- No terminal do backend você vê: `Servidor rodando`
- Não há erros de conexão com MongoDB
- Não há erros vermelhos no console

### Frontend está OK se:
- No terminal do frontend você vê algo como: `Local: http://localhost:5173/`
- Não há erros vermelhos no console
- O navegador abre sem erros

### MongoDB está OK se:
- Você consegue conectar pelo MongoDB Compass
- O backend não dá erro de conexão
- Você consegue criar usuários e agendamentos

---

## 🐛 Problemas Comuns

### "Cannot connect to MongoDB"
- Verifique se o MongoDB está rodando
- Abra o MongoDB Compass e tente conectar
- Verifique o arquivo `server/.env`

### "Port already in use"
- Outro processo está usando a porta
- Feche outros servidores que possam estar rodando
- Ou altere a porta no `.env` (backend) ou `vite.config.js` (frontend)

### Página não carrega
- Verifique se ambos os servidores estão rodando
- Verifique os erros no console do navegador (F12)
- Verifique os erros nos terminais

### Erro ao criar conta/login
- Verifique se o backend está rodando
- Verifique a conexão com MongoDB
- Verifique os logs no terminal do backend

---

## 📊 Ver Dados no MongoDB Compass

1. Abra o MongoDB Compass
2. Conecte em: `mongodb://localhost:27017`
3. Você verá o banco `agendamentos-db`
4. Dentro dele, você verá:
   - Coleção `users` (usuários cadastrados)
   - Coleção `agendamentos` (agendamentos criados)

---

## 🛑 Parar os Servidores

Para parar os servidores:
1. Volte para os terminais do PowerShell
2. Pressione `Ctrl + C` em cada terminal
3. Os servidores serão encerrados

---

## 📝 Endpoints da API

Você pode testar diretamente:

- `POST http://localhost:3000/api/auth/register` - Criar conta
- `POST http://localhost:3000/api/auth/login` - Fazer login
- `GET http://localhost:3000/api/agendamentos` - Listar agendamentos (requer autenticação)

Use o Postman ou Insomnia para testar!

---

## ✅ Tudo Pronto!

Seu projeto está rodando! Divirta-se testando! 🎉

Se tiver qualquer problema, me avise!
