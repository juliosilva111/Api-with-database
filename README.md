# API de usuários

API simples em Node.js, Express e PostgreSQL com Drizzle ORM.

## Como funciona

- `src/schema.js`: descreve a tabela `usuarios` no PostgreSQL. Define `id`, `nome`, `email` único e `idade`.
- `src/database.js`: lê `DATABASE_URL` do `.env`, valida a configuração e cria a conexão com o Neon.
- `src/app.js`: monta a aplicação Express. Configura JSON, headers de segurança, limite de requisições e as rotas da API.
- `src/server.js`: inicializa o app com validação de porta, fallback seguro e tratamento de shutdown.
- `test/api.test.js`: testa as rotas usando um banco simulado, sem alterar dados reais.

## Configuração

1. Instale as dependências:

   ```bash
   npm ci
   ```

2. Crie o `.env` a partir do arquivo de exemplo e informe uma conexão PostgreSQL válida:

   ```env
   DATABASE_URL="sua_connection_string"
   PORT=3003
   ```

   No Windows PowerShell, você pode iniciar copiando o exemplo:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Inicie a API no modo de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Ou inicie em produção:

   ```bash
   npm start
   ```

5. Verifique se a aplicação está funcionando:

   ```bash
   curl http://localhost:3003/health
   ```

## Rotas

- `GET /health`: confirma que o processo está respondendo.
- `GET /usuarios`: lista usuários.
- `POST /usuarios`: cria um usuário. Envie `nome`, `email` e, opcionalmente, `idade` em JSON.

As mesmas operações estão disponíveis com o prefixo de versão:

- `GET /api/v1/health`
- `GET /api/v1/usuarios`
- `POST /api/v1/usuarios`

A API aceita requisições CORS de qualquer origem e responde a preflight `OPTIONS`.

### POST /usuarios

Exemplo de corpo válido:

```json
{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "idade": 30
}
```

A API rejeita nomes curtos ou longos demais, e-mails inválidos, idade fora de `0` a `150`, JSON inválido e corpos maiores que `10 KB`. E-mails são normalizados para minúsculas; um e-mail repetido retorna `409`.

Respostas de sucesso usam `200` para consultas e `201` para criação. Dados inválidos retornam `400`, e uma rota inexistente retorna `404`.

## Segurança e robustez

- O servidor usa `helmet` para reduzir vulnerabilidades HTTP.
- A aplicação desativa `x-powered-by`.
- Há limite de 100 requisições por IP em 15 minutos.
- A porta é validada e cai para `3003` se o valor informado for inválido.
- Em caso de `EADDRINUSE`, o processo para com erro explícito.
- O servidor também trata `SIGINT` e `SIGTERM` de forma segura.

## Testes

Execute os testes com:

```bash
npm test
```

Os testes usam um banco simulado e não alteram dados reais.
O fluxo recomendado para cada funcionalidade é:

1. Escrever um teste que descreva o comportamento esperado.
2. Confirmar que o teste falha antes da implementação quando a funcionalidade ainda não existe.
3. Implementar a rota ou regra necessária.
4. Executar novamente os testes até que todos passem.
5. Revisar casos válidos, entradas inválidas, erros do banco, limites e respostas HTTP.

Os testes atuais cobrem:

- health check e headers de segurança;
- listagem e criação de usuários;
- normalização de nome e e-mail;
- validação de tipos, limites e campos obrigatórios;
- JSON inválido e payload acima de `10 KB`;
- e-mail duplicado;
- rota inexistente e falhas do banco;
- limite de requisições.

O `.env` deve ficar fora do Git e nunca deve ser publicado. Se a credencial do banco já foi compartilhada ou commitada, ela deve ser rotacionada imediatamente no provedor e substituída localmente pela nova senha.

## Estrutura do projeto

- `src/`: aplicação, conexão com banco, schema e bootstrap do servidor.
- `test/`: testes automatizados das rotas com banco simulado.

## Contexto do produto e skills

O produto atende pequenas empresas B2B de serviços técnicos que trabalham em campo, como refrigeração, instalação de câmeras, redes, elétrica, manutenção, hidráulica e instalação de equipamentos.

Mudanças relevantes de produto, arquitetura, segurança ou experiência devem atualizar este README para manter a documentação sincronizada com o código.

As skills locais em `.github/skills/` orientam o desenvolvimento futuro:

- `project-brainstorming`: esclarece objetivo, escopo, alternativas, contratos e testes antes de implementar.
- `product-marketing-field-services`: orienta posicionamento, copy, fluxos e métricas para operações técnicas em campo.
- `frontend-21st`: define padrões para o futuro frontend React com componentes reutilizáveis, temas e acessibilidade.
- `gsap-frontend`: orienta animações GSAP com React, performance, cleanup e `prefers-reduced-motion`.
- `saas-architecture`: orienta módulos, multi-tenancy, evolução e decisões arquiteturais.
- `field-service-operations`: modela clientes, ordens, visitas, técnicos e execução em campo.
- `saas-auth-and-permissions`: orienta autenticação, papéis, convites e isolamento entre empresas.
- `api-contracts`: padroniza rotas, payloads, erros, paginação e versionamento.
- `testing-quality`: organiza TDD, testes de API, integração, autorização e regressão.
- `postgresql-drizzle`: orienta schema, migrations, constraints, índices e transações.
- `application-security`: revisa validação, secrets, CORS, rate limiting, dependências e ameaças.
- `field-service-ux`: prioriza uso mobile, acessibilidade e operação em condições de campo.
- `pwa-offline-field-service`: orienta instalação, fila offline, sincronização e conflitos.
- `observability-production`: orienta logs, métricas, health checks, alertas e incidentes.
- `github-ci-cd`: define checks, builds, segurança, deploy, ambientes e rollback.
- `saas-onboarding`: orienta ativação, convites, checklist e primeiro valor.
- `product-analytics`: define eventos, funis, retenção e métricas com privacidade.
- `saas-billing`: orienta planos, trials, limites, webhooks e estados de cobrança.
- `research-filtered`: pesquisa fontes confiáveis com filtro de ruído, deduplicação e economia de tokens.
- `creative-generation`: cria conceitos e variações de criativos para o nicho sem inventar provas.
- `copywriting-sales`: cria copy, mensagens comerciais e propostas orientadas a dores reais.
- `api-design` e `api-testing`: apoiam desenho e testes de endpoints.
- `database`: apoia decisões de persistência e consultas.
- `environment`: orienta configuração de ambientes e variáveis.
- `error-handling`: padroniza tratamento e exposição de erros.
- `security`: apoia revisões e controles de segurança.
- `code-review`: orienta revisão de mudanças antes do merge.
- `release`: apoia preparação e publicação de versões.

As skills de marketing e pesquisa são guias locais; não instalam serviços externos nem enviam dados do projeto para terceiros. Quando pesquisa atualizada for necessária, devem priorizar fontes primárias e retornar somente evidências relevantes.
