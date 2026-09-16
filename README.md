# API de usuários

API simples em Node.js, Express e PostgreSQL com Drizzle ORM.

## Como funciona

- `src/schema.js`: descreve a tabela `usuarios` no PostgreSQL. Define `id`, `nome`, `email` único e `idade`.
- `src/database.js`: lê `DATABASE_URL` do `.env`, valida a configuração e cria a conexão com o Neon.
- `src/app.js`: monta a aplicação Express. Configura JSON, headers de segurança, limite de requisições e as rotas da API.
- `src/server.js`: inicializa o app com validação de porta, fallback seguro e tratamento de shutdown.
- `test/api.test.js`: testa as rotas usando um banco simulado, sem alterar dados reais.

## Configuração

1. Instale as dependências:

   ```bash
   npm ci
   ```

2. Crie o `.env` a partir do arquivo de exemplo e informe uma conexão PostgreSQL válida:

   ```env
   DATABASE_URL="sua_connection_string"
   PORT=3003
   ```

   No Windows PowerShell, você pode iniciar copiando o exemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Inicie a API no modo de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Ou inicie em produção:

   ```bash
   npm start
   ```

5. Verifique se a aplicação está funcionando:

   ```bash
   curl http://localhost:3003/health
   ```

## Rotas

- `GET /health`: confirma que o processo está respondendo.
- `GET /usuarios`: lista usuários.
- `POST /usuarios`: cria um usuário. Envie `nome`, `email` e, opcionalmente, `idade` em JSON.

As mesmas operações estão disponíveis com o prefixo de versão:

- `GET /api/v1/health`
- `GET /api/v1/usuarios`
- `POST /api/v1/usuarios`

A API aceita requisições CORS de qualquer origem e responde a preflight `OPTIONS`.

### POST /usuarios

Exemplo de corpo válido:

```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "idade": 30
}
```

A API rejeita nomes curtos ou longos demais, e-mails inválidos, idade fora de `0` a `150`, JSON inválido e corpos maiores que `10 KB`. E-mails são normalizados para minúsculas; um e-mail repetido retorna `409`.

Respostas de sucesso usam `200` para consultas e `201` para criação. Dados inválidos retornam `400`, e uma rota inexistente retorna `404`.

## Segurança e robustez

- O servidor usa `helmet` para reduzir vulnerabilidades HTTP.
- A aplicação desativa `x-powered-by`.
- Há limite de 100 requisições por IP em 15 minutos.
- A porta é validada e cai para `3003` se o valor informado for inválido.
- Em caso de `EADDRINUSE`, o processo para com erro explícito.
- O servidor também trata `SIGINT` e `SIGTERM` de forma segura.

## Testes

Execute os testes com:

```bash
npm test
```

Os testes usam um banco simulado e não alteram dados reais.

O `.env` deve ficar fora do Git e nunca deve ser publicado. Se a credencial do banco já foi compartilhada ou commitada, ela deve ser rotacionada imediatamente no provedor e substituída localmente pela nova senha.

## Estrutura do projeto

- `src/`: aplicação, conexão com banco, schema e bootstrap do servidor.
- `test/`: testes automatizados das rotas com banco simulado.
