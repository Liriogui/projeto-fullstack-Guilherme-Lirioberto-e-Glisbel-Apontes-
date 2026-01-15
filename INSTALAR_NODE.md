# 📥 Como Instalar o Node.js

O Node.js não foi encontrado no seu sistema. Siga estes passos para instalar:

## Opção 1: Instalar via Site Oficial (Recomendado)

1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (Long Term Support) - recomendada para a maioria dos usuários
3. Execute o instalador
4. **Importante**: Durante a instalação, certifique-se de marcar a opção "Add to PATH"
5. Reinicie o terminal/PowerShell após instalar
6. Verifique se funcionou executando:
   ```bash
   node --version
   npm --version
   ```

## Opção 2: Instalar via Chocolatey (se você usa Chocolatey)

```bash
choco install nodejs-lts
```

## Após Instalar

Depois que o Node.js estiver instalado, você pode:

1. **Criar o arquivo `.env`** na pasta `server/` com o conteúdo:
   ```
   MONGO_URI=mongodb://localhost:27017/agendamentos-db
   JWT_SECRET=meu-secret-super-seguro-para-jwt-token-alterar-em-producao
   PORT=3000
   ```

2. **Instalar dependências do backend:**
   ```bash
   cd server
   npm install
   ```

3. **Instalar dependências do frontend:**
   ```bash
   cd client
   npm install
   ```

4. **Rodar o projeto** conforme instruções no arquivo `COMO_EXECUTAR.md`

## Verificação

Após instalar, execute no terminal:
```bash
node --version  # Deve mostrar algo como: v18.x.x ou v20.x.x
npm --version   # Deve mostrar algo como: 9.x.x ou 10.x.x
```

Se esses comandos funcionarem, o Node.js está instalado corretamente! 🎉
