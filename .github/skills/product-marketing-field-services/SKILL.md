---
name: product-marketing-field-services
description: Use when defining positioning, copy, landing pages, onboarding, analytics, or growth for a B2B product serving small technical field-service businesses.
---

# Product marketing para serviços técnicos em campo

## Contexto do produto

O produto atende pequenas empresas B2B que prestam serviços técnicos em campo e precisam organizar clientes, usuários, chamados, agenda, equipes e execução do trabalho.

O nicho inclui:

- ar-condicionado e refrigeração;
- instalação de câmeras e alarmes;
- técnicos de internet e redes;
- eletricistas;
- manutenção e assistência técnica;
- encanadores;
- instaladores;
- técnicos de equipamentos.

## Público e problemas

Falar principalmente com donos, gestores e responsáveis pela operação. Eles normalmente precisam reduzir:

- perda de informações em WhatsApp e planilhas;
- atrasos e esquecimentos de visitas;
- deslocamentos improdutivos;
- retrabalho por falta de histórico;
- dificuldade para acompanhar técnicos em campo;
- demora para enviar orçamento, status e comprovantes ao cliente.

Não presumir que o público tenha uma equipe de TI ou tempo para configurações complexas. Priorizar linguagem clara, implantação rápida e benefício operacional mensurável.

## Posicionamento

Comunicar o produto como uma ferramenta simples para organizar e acompanhar serviços técnicos em campo, desde o chamado até a conclusão. Destacar economia de tempo, visibilidade da operação, histórico dos clientes e menos dependência de controles manuais.

Evitar promessas absolutas, jargão técnico e posicionamento genérico de “software para qualquer empresa”. Sempre conectar a mensagem a uma rotina de campo concreta.

## Mensagens e copy

Antes de escrever uma página ou campanha, definir:

```text
Público:
Problema operacional:
Resultado desejado:
Prova ou evidência:
Próxima ação:
```

Exemplos de mensagens:

- “Organize os serviços da sua equipe técnica em um só lugar.”
- “Saiba quais visitas estão pendentes, em andamento e concluídas.”
- “Tenha o histórico do cliente antes de enviar o técnico ao local.”

Usar chamadas para ação específicas, como “Conhecer a plataforma”, “Organizar meus serviços” ou “Agendar uma demonstração”. Não inventar depoimentos, métricas ou integrações que ainda não existam.

## Produto e frontend

Ao planejar telas, priorizar os fluxos:

1. cadastrar cliente e solicitação;
2. visualizar serviços pendentes;
3. atribuir ou acompanhar um técnico;
4. registrar execução em campo;
5. consultar histórico e comunicar o resultado.

Cada fluxo deve funcionar bem em celular, ter estados de carregamento, vazio e erro, e exigir o mínimo de campos possível. Usar `frontend-21st` para componentes e `gsap-frontend` apenas para animações que ajudem a orientar o usuário.

## Métricas

Priorizar métricas relacionadas a valor operacional:

- tempo até o primeiro serviço cadastrado;
- chamados criados e concluídos;
- percentual de serviços com status atualizado;
- tempo entre abertura e conclusão;
- usuários ativos por empresa;
- retenção de empresas;
- conversão de demonstração ou cadastro.

Não adicionar analytics sem definir qual decisão a métrica ajudará a tomar e sem respeitar privacidade e consentimento aplicáveis.

