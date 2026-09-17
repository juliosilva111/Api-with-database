# Error Handling

Ao alterar tratamento de erros:

1. Valide a entrada antes de acessar o banco.
2. Use códigos HTTP coerentes, incluindo `400`, `409` e `500`.
3. Mantenha mensagens úteis sem expor stack traces, credenciais ou detalhes internos.
4. Preserve o formato de erro usado pelas rotas existentes.
5. Não esconda falhas com retornos de sucesso ou `catch` genérico.
6. Adicione testes para erros novos e regressões.
