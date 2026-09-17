---
name: pwa-offline-field-service
description: Use when adding installability, offline workflows, local queues, synchronization, or conflict handling for technicians in poor connectivity.
---
# PWA e operação offline

Defina explicitamente o que funciona offline, o que exige rede e como o usuário sabe o estado da sincronização. Use fila idempotente, identificadores estáveis, timestamps e resolução de conflitos documentada.

Não armazene tokens ou dados sensíveis sem proteção adequada. Mostre pendências, falhas e retry; não finja que uma operação foi sincronizada. Teste queda de rede, duplicação, atualização concorrente e recuperação.
