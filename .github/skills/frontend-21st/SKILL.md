---
name: frontend-21st
description: Use when building the future React frontend for this API with reusable, accessible, themed components inspired by 21st.dev and shadcn/ui.
---

# Frontend com 21st.dev

Use esta skill ao criar a interface web do projeto de usuários. O frontend deve consumir a API existente, manter componentes reutilizáveis e seguir padrões de acessibilidade, responsividade e temas claro/escuro.

## Stack recomendada

- React com TypeScript.
- Tailwind CSS.
- Componentes compatíveis com shadcn/ui e Radix UI quando houver necessidade de primitives acessíveis.
- Cliente HTTP pequeno e centralizado para chamar a API.
- Testes de componentes e de fluxos críticos.

## Organização

Separe a implementação reutilizável da demonstração ou página que a utiliza:

```text
frontend/
├── src/
│   ├── components/       # componentes reutilizáveis
│   ├── pages/             # telas e composição
│   ├── lib/api.ts         # chamadas à API
│   └── styles/globals.css # tokens de tema
└── tests/
```

Um componente deve receber dados e callbacks por `props`, em vez de embutir usuários ou textos específicos da página.

## Regras de implementação

1. Antes de criar um componente, verificar se já existe um componente equivalente no projeto ou no padrão shadcn/ui.
2. Usar variáveis semânticas de tema, como `background`, `foreground`, `primary`, `muted` e `destructive`; não espalhar cores fixas pela interface.
3. Garantir suporte a tema claro e escuro, estados de carregamento, erro, vazio e sucesso.
4. Usar elementos HTML semânticos, labels associados aos campos, foco visível, navegação por teclado e atributos ARIA somente quando necessários.
5. Projetar primeiro para telas menores e validar comportamento responsivo.
6. Não colocar credenciais no frontend. Apenas variáveis explicitamente públicas podem ser expostas ao bundle.
7. Centralizar a URL da API em configuração de ambiente e tratar respostas HTTP não-2xx explicitamente.
8. Adicionar testes para renderização, interação, validação de formulários e estados de erro.

## Exemplo de componente

```tsx
type UserCardProps = {
  name: string
  email: string
  age?: number
  onSelect?: () => void
}

export function UserCard({ name, email, age, onSelect }: UserCardProps) {
  return (
    <article className="rounded-lg border bg-card p-4 text-card-foreground">
      <h2 className="font-semibold">{name}</h2>
      <p className="text-muted-foreground">{email}</p>
      {age !== undefined && <p>Idade: {age}</p>}
      {onSelect && (
        <button type="button" onClick={onSelect}>
          Selecionar
        </button>
      )}
    </article>
  )
}
```

## Fluxo para novas telas

1. Definir o contrato da API e os estados da tela.
2. Escrever testes para o comportamento esperado.
3. Criar os componentes sem acoplar dados reais à apresentação.
4. Integrar a API por um módulo centralizado.
5. Validar teclado, contraste, responsividade, tema claro/escuro e mensagens de erro.
6. Executar lint, type-check e testes antes de abrir um Pull Request.

