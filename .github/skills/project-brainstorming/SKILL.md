---
name: project-brainstorming
description: Use before starting a non-trivial feature to clarify goals, scope, UX, API contracts, alternatives, tests, and implementation steps.
---

# Brainstorming do projeto

Use esta skill antes de implementar uma funcionalidade que envolva decisões de produto, API, banco, frontend ou arquitetura. O objetivo é transformar uma ideia em uma especificação curta, validada e executável, sem criar código prematuramente.

## Processo

1. **Entender o objetivo**
   - Qual problema será resolvido?
   - Quem usará a funcionalidade?
   - Qual resultado observável define sucesso?

2. **Delimitar o escopo**
   - O que entra nesta entrega?
   - O que fica explicitamente fora?
   - Existem requisitos de segurança, desempenho ou compatibilidade?

3. **Descrever os fluxos**
   - Fluxo principal de sucesso.
   - Entradas inválidas, estados vazios e falhas.
   - Estados de carregamento, repetição e cancelamento quando houver frontend.

4. **Propor alternativas**
   - Apresentar de duas a três opções viáveis.
   - Comparar simplicidade, manutenção, risco e impacto no usuário.
   - Recomendar a opção mais simples que satisfaça o objetivo.

5. **Definir contratos**
   - Rotas, métodos, parâmetros, payloads e respostas HTTP.
   - Modelo de dados e regras de validação.
   - Componentes, props e estados da interface, se houver frontend.

6. **Planejar a validação**
   - Escrever os casos de teste antes da implementação.
   - Cobrir sucesso, entradas inválidas, limites, erros e permissões.
   - Definir o comando de teste, lint ou type-check que será executado.

7. **Implementar em etapas**
   - Dividir o trabalho em tarefas pequenas e verificáveis.
   - Fazer mudanças cirúrgicas e manter o comportamento existente.
   - Parar e pedir confirmação quando houver uma decisão de produto significativa.

## Formato de saída

Antes de codificar, apresentar:

```text
Objetivo:
Escopo:
Fora do escopo:
Fluxos principais:
Alternativas:
Decisão recomendada:
Contrato:
Casos de teste:
Etapas de implementação:
```

Para alterações pequenas e sem decisões relevantes, usar uma versão resumida e não transformar o processo em burocracia.

## Regras do projeto

- Não adicionar dependências sem justificar o benefício.
- Preferir reutilizar padrões já existentes no projeto.
- Manter compatibilidade com a API Express e PostgreSQL existentes.
- Para o futuro frontend, integrar as skills `frontend-21st` e `gsap-frontend` somente quando componentes visuais ou animações forem necessários.
- Para posicionamento, copy e fluxos de produto, usar `product-marketing-field-services` como contexto do nicho de serviços técnicos em campo.
- Não incluir credenciais, dados reais ou segredos em exemplos, testes ou commits.
- Depois da implementação, executar os testes relacionados e relatar claramente o resultado.
