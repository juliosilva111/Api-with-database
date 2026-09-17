---
name: saas-auth-and-permissions
description: Use when implementing authentication, sessions, invitations, roles, tenant isolation, or authorization.
---
# Autenticação e permissões

Separe identidade, associação à empresa e papel. Papéis iniciais podem ser proprietário, gestor, técnico e cliente, mas autorizações devem ser verificadas no servidor em cada recurso.

Nunca confie em IDs, papéis ou empresa enviados pelo frontend. Valide sessão/token, tenant, propriedade do registro e ação permitida. Negue por padrão, evite enumeração de usuários, aplique expiração e rotação de credenciais e registre eventos de segurança sem expor segredos.

Teste acesso permitido, negado, usuário de outra empresa, sessão expirada, convite repetido e escalação de privilégio.
