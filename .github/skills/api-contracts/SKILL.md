---
name: api-contracts
description: Use when adding or changing API routes, payloads, errors, pagination, filters, versioning, or frontend integration.
---
# Contratos de API

Defina método, rota, autenticação, parâmetros, payload, resposta de sucesso, erros, validações e efeitos no banco antes de codificar. Preserve `/api/v1` e documente mudanças incompatíveis.

Use status HTTP consistentes, erros JSON estáveis e validação no limite da aplicação. Para listas, padronize paginação, filtros, ordenação e metadados. Nunca vaze stack trace, SQL, credenciais ou dados de outro tenant.

Atualize testes e README quando o contrato mudar. Prefira compatibilidade retroativa ou migração explícita a mudanças silenciosas.
