# Environment Configuration

Ao trabalhar com configuração:

1. Mantenha valores locais em `.env`, nunca no código ou no Git.
2. Atualize `.env.example` somente com nomes e exemplos não sensíveis.
3. Trate `DATABASE_URL` como segredo e nunca a registre.
4. Valide configurações obrigatórias na inicialização.
5. Diferencie desenvolvimento, teste e produção sem duplicar lógica.
6. Documente variáveis públicas e comandos de execução no README.
