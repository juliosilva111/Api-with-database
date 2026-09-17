---
name: postgresql-drizzle
description: Use when changing PostgreSQL schema, Drizzle models, migrations, indexes, transactions, or query performance.
---
# PostgreSQL e Drizzle

Modele relações e constraints no banco, não apenas na aplicação. Escolha tipos, nulabilidade, unicidade, chaves estrangeiras e índices a partir dos acessos reais.

Toda alteração deve ter migration revisável, plano para dados existentes, rollback ou mitigação e testes. Use transações para operações que precisam ser atômicas e paginação para listas grandes.

Nunca coloque credenciais no código. Analise queries lentas com métricas e `EXPLAIN` antes de adicionar índices ou abstrações.
