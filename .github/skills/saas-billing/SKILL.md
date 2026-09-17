---
name: saas-billing
description: Use when implementing plans, trials, limits, subscriptions, invoices, payment webhooks, upgrades, downgrades, or cancellations.
---
# Billing SaaS

Modele assinatura, plano, limites, período, status e eventos do provedor separadamente. Webhooks devem ser autenticados, idempotentes e auditáveis; o estado local não deve depender de uma única entrega.

Defina o que acontece em falha de pagamento, cancelamento, downgrade, reembolso e excesso de limite. Nunca armazene dados de cartão; use provedor compatível e testes em sandbox.
