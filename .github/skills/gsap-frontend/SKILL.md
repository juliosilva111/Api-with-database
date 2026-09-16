---
name: gsap-frontend
description: Use when adding purposeful GSAP animations to the future React frontend, especially timelines, scroll interactions, and coordinated component motion.
---

# Animações com GSAP

Use esta skill somente quando uma animação trouxer valor claro para a experiência do frontend. CSS e Tailwind são preferíveis para transições simples; GSAP deve ser usado para sequências, sincronização, animações controladas por scroll ou interações complexas.

## Instalação e escopo

```bash
npm install gsap @gsap/react
```

Em React, prefira `useGSAP` com uma referência de escopo. Não use seletores globais sem escopo e não crie animações durante o render.

```tsx
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function IntroAnimation() {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(".intro-item", {
      y: 16,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
    })
  }, { scope: container })

  return (
    <section ref={container}>
      <h1 className="intro-item">Usuários</h1>
      <p className="intro-item">Gerencie os usuários da API.</p>
    </section>
  )
}
```

O hook deve desfazer as animações quando o componente desmontar. Isso evita vazamentos, efeitos duplicados no modo estrito e referências a elementos removidos.

## Padrões de animação

- Use `gsap.to`, `gsap.from` ou `gsap.fromTo` para tweens simples.
- Prefira timelines a vários tweens com `delay`, pois elas expressam a sequência em um único lugar.
- Anime `transform` (`x`, `y`, `scale`, `rotation`) e `autoAlpha` em vez de propriedades que forçam recálculo de layout.
- Registre plugins uma vez, fora do componente, quando necessário.
- Em `ScrollTrigger`, defina `trigger`, início e fim explícitos e chame `ScrollTrigger.refresh()` somente depois de mudanças reais de layout.

```tsx
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
```

## Acessibilidade e desempenho

1. Respeite `prefers-reduced-motion`; ofereça uma versão sem movimento ou reduza duração e distância.
2. A animação nunca pode ser necessária para descobrir conteúdo, enviar formulário ou navegar.
3. Não use `will-change` permanentemente; aplique-o apenas quando a animação justificar.
4. Evite animar `width`, `height`, `top`, `left` e outras propriedades de layout quando transformações resolverem.
5. Não prenda o scroll sem uma justificativa forte e sem testar teclado e dispositivos móveis.
6. Garanta que elementos inicialmente invisíveis continuem acessíveis quando a animação estiver desativada.

## Integração com o frontend deste projeto

- Não anime dados sensíveis nem exponha credenciais no cliente.
- Coordene animações com os estados de carregamento, vazio, erro e sucesso da API.
- Para listas de usuários, anime apenas a entrada/remoção visual; mantenha a ordem e o conteúdo controlados pelo estado React.
- Teste a tela com animação reduzida e com JavaScript lento.
- Valide cleanup, navegação por teclado, responsividade e ausência de erros no console antes do Pull Request.

