# API de usuários

API simples em Node.js, Express e PostgreSQL com Drizzle ORM.

## Como funciona

- `src/schema.js`: descreve a tabela `usuarios` no PostgreSQL. Define `id`, `nome`, `email` único e `idade`.
- `src/database.js`: lê `DATABASE_URL` do `.env`, verifica se ela existe e cria a conexão com o Neon.
- `src/app.js`: monta a aplicação Express. Configura JSON, headers de segurança, limite de requisições e as rotas.
- `src/server.js`: cria o app e abre a porta HTTP. A porta padrão é `3003`; pode ser alterada com `PORT`.
- `test/api.test.js`: testa as rotas usando um banco simulado, sem alterar dados reais.

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie `.env` a partir de `.env.example` e informe uma conexão PostgreSQL válida:

   ```env
   DATABASE_URL="sua_connection_string"
   ```

3. Inicie em desenvolvimento:

   ```bash
   npm run dev
   ```

4. Verifique se está funcionando:

   ```bash
   curl http://localhost:3003/health
   ```

## Rotas

- `GET /health`: confirma que o processo está respondendo.
- `GET /usuarios`: lista usuários.
- `POST /usuarios`: cria um usuário. Envie `nome`, `email` e, opcionalmente, `idade` em JSON.

Exemplo de corpo válido:

```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "idade": 30
}
```

A API rejeita nomes curtos ou longos demais, e-mails inválidos, idade fora de `0` a `150`, JSON inválido e corpos maiores que `10 KB`. E-mails são normalizados para minúsculas; um e-mail repetido retorna `409`.

## Testes e segurança

Execute os testes com:

```bash
npm test
```

A API desativa `x-powered-by`, usa `helmet` para headers de segurança e limita requisições a 100 por IP em 15 minutos. O `.env` está ignorado pelo Git e nunca deve ser publicado.

A credencial que estiver atualmente no `.env` deve ser rotacionada no provedor do banco se ela tiver sido compartilhada ou commitada. Depois, atualize o `.env` local com a nova credencial.
