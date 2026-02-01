_Read in English:_ [English ver.](README-ENG.md)

# Micro Frontends – Case Study de Arquitetura (Angular)

## Resumo Executivo

Este repositório documenta um case study real de arquitetura frontend para uma plataforma de gestão acadêmica escalável, com potencial de adoção em nível nacional.

Atuei como **Frontend Technical Lead**, sendo responsável por definir a arquitetura frontend, propor e validar o uso de Micro Frontends com Module Federation e selecionar o Angular 17 como framework base, priorizando estabilidade e adequação a ambientes corporativos.

Apesar de ter sido inicialmente desenvolvido por um time pequeno e sob restrições de ferramentas e financiamento, a arquitetura foi intencionalmente projetada para suportar escalabilidade de longo prazo, evolução independente de domínios e crescimento organizacional.

[Leitura da PoC & Referências](/sigaa-mf-workspace/docs/microfrontends-poc.md) 🏹

---

## Contexto e Problema

Sistemas legados de gestão acadêmica utilizados por universidades públicas brasileiras são, em geral, monolíticos, fortemente acoplados e pouco adequados a requisitos modernos de usabilidade e escalabilidade.

Este projeto surgiu como uma prova de conceito para uma nova plataforma com o objetivo de:

- atender múltiplas universidades públicas  
- permitir autonomia institucional  
- escalar entre times e domínios  
- evoluir de forma independente ao longo do tempo  

O principal desafio foi projetar uma arquitetura frontend capaz de sustentar manutenibilidade de longo prazo e escalabilidade organizacional em um contexto de incerteza institucional e recursos limitados.

---

## Restrições e Premissas

### Institucionais
- Implantação inicial limitada a uma única universidade (UFCG)
- Expansão futura condicionada à aprovação e financiamento governamental (MEC)
- Ausência de uma estratégia de migração previamente definida a partir de sistemas legados

### Técnicas
- Backend projetado com base em microserviços desacoplados
- Frontend com necessidade de evolução independente entre domínios
- Arquitetura flexível quanto a estratégias de adoção e implantação

### Design e Ferramentas
- Ausência de financiamento governamental inicial
- Time de design operando com ferramentas gratuitas
- Sem acesso a bibliotecas pagas de componentes ou UI kits

Como consequência, todos os componentes de interface foram desenhados e implementados manualmente.

---

## Drivers Não Funcionais

As decisões arquiteturais foram principalmente orientadas pelos seguintes requisitos não funcionais:

- **Deploys independentes**, reduzindo overhead de coordenação
- **Clareza de ownership de domínios**, suportando crescimento futuro de times
- **Blast radius controlado**, limitando o impacto de mudanças
- **Manutenibilidade de longo prazo** acima de velocidade inicial de entrega
- **Flexibilidade diante de incertezas institucionais**

---

## Alternativas Avaliadas

### SPA Monolítica
- Setup inicial mais simples
- Alto acoplamento e deploy centralizado  
→ Rejeitada devido a riscos de escalabilidade

### Monólito Modular
- Melhor organização interna
- Ainda um único artefato de deploy  
→ Insuficiente para escalar organizacionalmente

### Micro Frontends com Module Federation
- Deploys independentes
- Clareza de domínios
- Alinhamento com backend em microserviços  
→ Selecionada para validação, apesar da maior complexidade

---

## Principais Decisões Arquiteturais

- **Micro Frontends** foram propostos e defendidos como uma escolha estratégica para suportar escalabilidade organizacional de longo prazo.
- **Module Federation (Webpack 5)** foi selecionado para composição em tempo de execução e compartilhamento controlado de dependências.
- **Angular 17** foi escolhido por maturidade do framework, estabilidade e adequação a aplicações de grande porte.
- Uma **Shared UI Library** foi introduzida desde o início para centralizar componentes reutilizáveis e garantir consistência visual sob restrições de tooling.

Todas as decisões arquiteturais de frontend foram lideradas e validadas pela Frontend Technical Lead.

### Architecture Decision Records (ADR)

As principais decisões arquiteturais desta PoC foram registradas formalmente como ADRs (Architecture Decision Records), garantindo rastreabilidade técnica e clareza de critérios de escolha.

- [ADR 001 — Route-based Microfrontend Integration](./sigaa-mf-workspace/docs/adr/001-route-based-mfe-integration.md)
- [ADR 002 — Access Control Domain Boundary](./sigaa-mf-workspace/docs/adr/002-access-control-boundary.md)

---

## Desenho Técnico

![Arquitetura](./sigaa-mf-workspace/docs/Arquitetura.jpg)

_Author: Gabrielly Amorin — 2026 — Microfrontend PoC_

Versão PDF:
[Desenho da arquitetura em PDF](./sigaa-mf-workspace/docs/Arquitetura.pdf)

- **Shell Application**
  - Ponto de entrada da aplicação
  - Orquestração de rotas
  - Carregamento dinâmico dos MFEs
  - Integração via Route-based Module Federation

- **Micro Frontends**
  - Isolados por domínio funcional
  - Deploy independente
  - Ausência de acoplamento direto entre MFEs

- **Shared UI Library**
  - Componentes reutilizáveis
  - Padrões visuais consistentes
  - Implementação manual com HTML semântico e estilos utilitários

A comunicação entre MFEs foi intencionalmente limitada a limites de navegação.

## Validação Arquitetural Automatizada

A arquitetura de integração Shell ↔ Micro Frontends foi validada com testes End-to-End automatizados.

Os testes cobrem:

- carregamento de MFEs via Module Federation

- resolução de rotas remotas no Shell

- composição correta de prefixos de rota (shell + rotas internas do MFE)

- renderização de fallback quando um microfrontend remoto falha

Esses testes foram usados como mecanismo de verificação de boundary, roteamento e estratégia de fallback da arquitetura proposta.

## Decisão Arquitetural — Padrão de Integração dos Micro Frontends

<details>

<summary>Ver decisão detalhada de integração Shell ↔ Micro Frontends</summary>

### Decisão

A integração entre Shell e Micro Frontends adota **Route-based Module Federation**, onde cada MFE expõe rotas Angular e é carregado dinamicamente via lazy loading do router.

### Alternativa não adotada

Lifecycle imperativo:

```
mount(container)
unmount()
```

Rejeitado por aumentar complexidade runtime e romper integração nativa com Angular Router.

### Justificativa técnica

- Todos os MFEs usam Angular
- Boundary natural baseado em rota
- Compatível com guards, resolvers e DI
- Sem lifecycle manual de DOM
- Melhor testabilidade
- Menor código de infraestrutura

### Pipeline de carregamento

remoteEntry → exposed routes → router lazy load → módulo → render

</details>

## Implementação Técnica — Contrato Shell ↔ Micro Frontends

A integração entre Shell e Micro Frontends foi implementada com um **contrato explícito e defensivo**, visando reduzir acoplamento e falhas em runtime.

### Contrato mínimo

O Shell define um contrato mínimo esperado de cada MFE:

- `remoteEntry`: endereço do remote
- `exposedModule`: módulo exposto via Module Federation
- `routePath`: prefixo de rota definido no Shell

```ts
interface RemoteRouteContract {
  remoteEntry: string;
  exposedModule: string;
  routePath: string;
}
```

Esse contrato é centralizado no Shell e tipado como:
```ts
Record<MfeKey, RemoteRouteContract>
```

garantindo segurança em tempo de build contra chaves inválidas.

### Validação em runtime

Como contratos podem falhar em tempo de execução (deploy independente), o loader recebe o contrato como unknown e realiza validação explícita antes do carregamento:
```ts
assertRemoteContract(config);
```
Essa abordagem evita confiar apenas na tipagem estática e garante falhas previsíveis.

### Loader remoto

O loader de MFEs é tratado como infraestrutura pura e retorna um estado explícito:

- ready: rotas carregadas com sucesso

- failed: erro durante o carregamento

O loader não decide fallback nem contém lógica de UX.

### Estratégia de fallback

A decisão de fallback é responsabilidade do Router do Shell, permitindo:

- controle explícito de erro

- nobservabilidade

- possibilidade futura de retry

Esse desenho mantém separação clara entre infraestrutura e experiência do usuário.

### Contrato de rotas nos MFEs

Cada Micro Frontend expõe explicitamente um símbolo ROUTES via Module Federation:

```ts
export const ROUTES: Routes = [...]
```

O Shell carrega apenas rotas, não componentes, reforçando o padrão de route-based federation e evitando lifecycle imperativo.




## Decisão Arquitetural — Boundary do MFE Access Control

<details>

<summary>Ver decisão de agrupamento de Papéis, Permissões e Recursos</summary>

### Decisão

Papéis, Permissões e Recursos foram agrupados dentro de um único microfrontend de **Access Control**.

### Justificativa técnica

- Alta coesão funcional
- Mudança frequente conjunta
- Mesmo fluxo de autorização
- Redução de contratos inter-MFE
- Menor complexidade de integração

### Alternativa rejeitada

Separar em MFEs distintos geraria:

- fragmentação de domínio
- maior coordenação
- mais contratos runtime
- mais pontos de falha

### Critério de boundary aplicado
subdomínio coeso + taxa de mudança conjunta + fluxo funcional integrado

Tradeoff aceito: deploy conjunto dentro do subdomínio de segurança.

</details>

## Política de Roteamento — Shell vs Micro Frontends

<details>

<summary>Ver regras de definição de rotas em arquitetura com Module Federation</summary>

### Shell Route Prefix Policy

O Shell é responsável por definir os **prefixos de rota de domínio** para cada Micro Frontend.

Cada MFE é montado sob um prefixo único definido no router do Shell.

Exemplo:

```ts
// shell/app.routes.ts
{
  path: 'users',
  loadChildren: () => loadRemoteRoutes(...)
}
```

Resultado:

`/users` → ativa o MFE de usuários

O prefixo de domínio é sempre definido no Shell, nunca no remote.

### Remote Child Route Policy

Cada Micro Frontend define apenas **rotas internas relativas**, sem repetir o prefixo de domínio.

Exemplo correto no remote:
```ts
export const routes = [
  { path: '', component: UserListPage },
  { path: 'new', component: UserCreatePage },
  { path: ':id', component: UserDetailPage }
];

```
URLs finais:

```
/users
/users/new
/users/123
```

### Regra de Boundary de Roteamento

URL final = shell prefix + remote child route

### Anti-pattern evitado

Não declarar prefixo de domínio dentro do remote:

```ts
// ❌ incorreto no remote
{ path: 'users', children: [...] }
```

Isso gera duplicação de prefixo e falha de match de rota em runtime.

### Benefícios

- ownership claro de domínio no Shell

- rotas internas isoladas por MFE

- composição previsível de URLs

- suporte correto a deep linking

- menor acoplamento entre MFEs

</details>

---

## O Que Ficou Intencionalmente Fora do Escopo

A prova de conceito evitou deliberadamente:

- Estado global compartilhado entre MFEs
- Orquestração avançada em runtime
- Estratégias de configuração multi-tenant
- Pipelines de CI/CD complexos

Esses pontos foram adiados para evitar complexidade prematura e manter o foco da PoC na validação arquitetural.

---

## Trade-offs e Riscos

- Complexidade operacional maior em comparação a uma SPA monolítica
- Custo mais alto de onboarding para novos contribuidores
- Necessidade de governança explícita para evitar fragmentação
- Risco de overengineering caso a escala projetada não se concretize

Esses riscos foram conscientemente aceitos considerando o contexto institucional e a projeção de crescimento da plataforma.

---

## Quando Usaria / Quando Não Usaria Novamente

Micro Frontends não devem ser escolhidos com base no tamanho atual do time, mas sim na trajetória esperada do sistema.

São apropriados quando há expectativa real de escalabilidade organizacional e evolução independente, mesmo com um time inicial reduzido. Devem ser evitados em aplicações que se espera permanecerem pequenas e estáveis ao longo do tempo.

---

## Papel e Responsabilidades

**Frontend Technical Lead**

- Definição da arquitetura frontend  
- Proposição e validação da adoção de Micro Frontends  
- Seleção das tecnologias base  
- Liderança das decisões arquiteturais e da estrutura do código  
- Orientação de contribuidores juniores e distribuição de tarefas  
- Tradução de uma proposta institucional de alto nível em decisões arquiteturais concretas de frontend