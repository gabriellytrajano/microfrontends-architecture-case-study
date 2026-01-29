_Read in English:_ [English ver.](README-ENG.md)

# Micro Frontends – Case Study de Arquitetura (Angular)

## Resumo Executivo

Este repositório documenta um case study real de arquitetura frontend para uma plataforma de gestão acadêmica escalável, com potencial de adoção em nível nacional.

Atuei como **Frontend Technical Lead**, sendo responsável por definir a arquitetura frontend, propor e validar o uso de Micro Frontends com Module Federation e selecionar o Angular 17 como framework base, priorizando estabilidade e adequação a ambientes corporativos.

Apesar de ter sido inicialmente desenvolvido por um time pequeno e sob restrições de ferramentas e financiamento, a arquitetura foi intencionalmente projetada para suportar escalabilidade de longo prazo, evolução independente de domínios e crescimento organizacional.

[Detalhes ténicos podem ser encontrados aqui:] 🏹 (/sigaa-mf-workspace/docs/microfrontends-poc.md)

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

---

## Desenho Técnico

- **Shell Application**
  - Ponto de entrada da aplicação
  - Orquestração de rotas
  - Carregamento dinâmico dos MFEs

- **Micro Frontends**
  - Isolados por domínio funcional
  - Deploy independente
  - Ausência de acoplamento direto entre MFEs

- **Shared UI Library**
  - Componentes reutilizáveis
  - Padrões visuais consistentes
  - Implementação manual com HTML semântico e estilos utilitários

A comunicação entre MFEs foi intencionalmente limitada a limites de navegação.

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
- Orientação de contribuidores juniores e distribuição de tarefas-
- Tradução de uma proposta institucional de alto nível em decisões arquiteturais concretas de frontend
