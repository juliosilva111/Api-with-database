---
name: field-service-operations
description: Use when modeling or implementing customers, work orders, technicians, visits, schedules, materials, attachments, or field execution.
---
# Operações em campo

Modele o fluxo: solicitação → ordem de serviço → agendamento → atribuição → execução → revisão → conclusão. Preserve histórico de status, autor e horário; não sobrescreva fatos operacionais importantes.

Entidades comuns: empresas, clientes, locais, contatos, técnicos, ordens de serviço, visitas, materiais, anexos, checklists e registros de execução. Defina estados válidos e transições antes das rotas.

Priorize celular, conexão instável, pouca digitação, fotos, observações e comprovantes. Toda regra deve considerar cancelamento, reagendamento, duplicidade e concorrência entre usuários.
