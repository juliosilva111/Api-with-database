# API Design

Ao criar ou alterar endpoints:

1. Preserve nomes de rotas, métodos HTTP e contratos existentes.
2. Valide e normalize entradas explicitamente.
3. Use respostas JSON consistentes e status HTTP adequados.
4. Considere duplicidade, idempotência, limites de payload e casos de borda.
5. Evite adicionar paginação, filtros ou abstrações antes de existir uma necessidade real.
6. Atualize testes e README quando o contrato público mudar.
