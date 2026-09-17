---
name: github-ci-cd
description: Use when creating GitHub Actions, PR checks, builds, security scans, deployments, environments, or rollback workflows.
---
# CI/CD no GitHub

Em todo PR execute instalação reprodutível, testes, lint, type-check e build. Fixe versões quando necessário, use cache com cuidado e mantenha secrets apenas em configurações protegidas.

Separe staging e produção, exija aprovação para deploy sensível, publique artefatos rastreáveis e tenha rollback documentado. Falhas devem bloquear merge; não ignore testes ou scanners para “destravar” a pipeline.
