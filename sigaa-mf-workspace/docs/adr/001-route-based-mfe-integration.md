# ADR 001 — Integração de Micro Frontends Baseada em Rotas

## Contexto

A aplicação é composta por múltiplos microfrontends organizados por domínio funcional, todos implementados com Angular e integrados em uma única SPA via Module Federation.

Era necessário definir o padrão de integração entre Shell e Micro Frontends.

Duas abordagens foram consideradas:

- integração baseada em rotas remotas (route-based federation)
- integração por lifecycle imperativo (mount/unmount)

---

## Decisão

Foi adotado o padrão **integração baseada em rotas (Route-based Microfrontend Integration)**.

Cada microfrontend expõe rotas Angular via Module Federation, e o Shell realiza o carregamento dinâmico dessas rotas por meio de lazy loading do Angular Router.

---

## Modelo Técnico

Remote expõe:

exposes: {
'./Routes': 'app.routes.ts'
}

Shell consome:

remoteEntry → exposed routes → router lazy load → route configuration → render


---

## Alternativas Consideradas

### Integração por lifecycle imperativo

Remote expõe API imperativa:

mount(container)
unmount()

Shell monta manualmente no DOM container.

Esta alternativa foi rejeitada por:

- maior complexidade de runtime
- necessidade de lifecycle manual
- perda de integração nativa com Angular Router
- maior risco de memory leak
- aumento de contratos imperativos entre shell e remotes

---

## Justificativa

A decisão foi baseada nos seguintes critérios técnicos:

- homogeneidade de framework (Angular em todos os MFEs)
- boundary natural baseado em rotas
- compatibilidade com guards e resolvers
- preservação da injeção de dependência por módulo
- menor código de infraestrutura
- melhor testabilidade com RouterTestingModule
- menor custo cognitivo para evolução futura

---

## Consequências

### Positivas

- integração alinhada ao Angular Router
- lazy loading consistente
- menor acoplamento runtime
- menor superfície de erro operacional
- melhor suporte de tooling Angular

### Negativas

- não suporta embedding arbitrário fora do router
- não é adequado para MFEs multi-framework
- não é indicado para cenários de widget/plugin runtime

---

## Refinamentos de Implementação

Após a decisão inicial de adotar integração baseada em rotas, a arquitetura foi refinada para garantir consistência, previsibilidade e baixo acoplamento entre Shell e Micro Frontends.

### Contrato explícito Shell ↔ Micro Frontend

O Shell define um contrato mínimo esperado de cada Micro Frontend, contendo apenas as informações necessárias para o carregamento de rotas:

- `remoteEntry`
- `exposedModule`
- `routePath`

Esse contrato é centralizado no Shell e validado em tempo de execução para evitar falhas implícitas decorrentes de deploys independentes.

### Exposição de rotas como contrato

Cada Micro Frontend expõe explicitamente um símbolo fixo (`ROUTES`) via Module Federation.

O Shell consome apenas rotas, e nunca componentes ou APIs imperativas, reforçando o padrão de integração declarativa baseada no Angular Router.

### Separação de responsabilidades

O carregamento remoto é tratado como infraestrutura pura. O loader não decide fallback nem contém lógica de UX.

A responsabilidade por estratégias de fallback, tratamento de erro e composição de navegação pertence exclusivamente ao Shell, por meio do Angular Router.

Essa separação evita acoplamento entre infraestrutura e experiência do usuário, além de permitir observabilidade e extensões futuras (ex.: retry).

## Decisão Final

A integração entre Shell e Micro Frontends é declarativa e baseada em rotas, não imperativa baseada em montagem manual de container DOM.