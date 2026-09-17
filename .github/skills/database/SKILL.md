# Database and Schema

Ao alterar banco ou consultas:

1. Entenda a tabela `usuarios` e o schema atual.
2. Preserve consultas parametrizadas e o comportamento dos endpoints.
3. Trate `DATABASE_URL` como segredo e nunca a registre.
4. Verifique impacto em testes, dados existentes e documentação.
5. Prefira mudanças pequenas e reversíveis.
