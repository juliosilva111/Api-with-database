---
name: testing-quality
description: Use when adding features, fixing regressions, or defining unit, API, integration, frontend, authorization, and regression tests.
---
# Testes e qualidade

Comece pelo comportamento observável: teste que falha, implementação mínima, teste verde e refatoração. Cubra sucesso, validação, limites, concorrência, autorização, erros do banco, respostas HTTP e estados vazios.

Use banco simulado para regras rápidas e banco temporário/integrado para queries e migrations. Evite testes frágeis, dependência de ordem, dados reais, espera fixa e snapshots sem valor.

Antes do PR execute testes direcionados, suíte completa, lint, type-check e build quando existirem. Investigue falhas; não desabilite testes para obter verde.
