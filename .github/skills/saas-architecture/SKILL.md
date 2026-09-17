---
name: saas-architecture
description: Use when designing the architecture, tenancy model, modules, environments, or evolution strategy of this field-service SaaS.
---
# Arquitetura SaaS

Projete por módulos, mantendo frontend, API, domínio e persistência separáveis. Modele a empresa como tenant desde o início: toda leitura e escrita deve ser vinculada à organização autenticada e nunca confiar apenas em um `organizationId` enviado pelo cliente.

Comece simples, mas deixe pontos claros para organizações, usuários, papéis, auditoria e configurações. Prefira contratos explícitos, migrations reversíveis e mudanças incrementais. Não introduza microserviços, filas ou cache distribuído sem um problema medido que justifique a complexidade.

Antes de uma decisão relevante, documente objetivo, alternativas, impacto em dados, segurança, operação e plano de migração.
