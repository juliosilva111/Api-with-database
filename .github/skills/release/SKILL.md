# Release and CI

Antes de preparar uma entrega:

1. Execute `npm ci` quando validar a instalação limpa.
2. Execute `npm test` com uma configuração de teste segura.
3. Confira `git status` e não inclua `.env`, logs ou artefatos gerados.
4. Revise alterações de dependências e o `package-lock.json`.
5. Confirme que README e `.env.example` continuam corretos.
6. Nunca inclua credenciais, tokens ou URLs reais de banco.
