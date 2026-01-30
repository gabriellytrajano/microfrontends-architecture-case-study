# ADR 002 — Boundary do Domínio de Access Control

## Context

O domínio de controle de acesso da plataforma inclui três entidades principais:

- Papéis (roles)
- Permissões (permissions)
- Recursos (resources)

Esses elementos fazem parte do mesmo fluxo de autorização e governança de acesso.

Era necessário decidir se deveriam ser implementados como microfrontends separados ou agrupados.

---

## Decisão

Papéis, Permissões e Recursos foram agrupados em um único microfrontend:

mfe-access-control


---

## Alternativas Consideradas

### Separação em múltiplos MFEs

mfe-roles
mfe-permissions
mfe-resources


Problemas identificados:

- alta interdependência funcional
- navegação cruzada frequente
- necessidade de contratos inter-MFE
- maior coordenação de deploy
- fragmentação de ownership
- aumento de complexidade operacional

---

### Agrupamento em um único MFE

mfe-access-control:
- Papéis
- Permissões
- Recursos


Alternativa adotada.

---

## Justificativa

Critérios técnicos aplicados:

### Coesão de domínio

Papéis, Permissões e Recursos pertencem ao mesmo subdomínio de autorização e segurança.

---

### Alta taxa de mudança conjunta

Alterações em Papéis frequentemente impactam Permissões e vínculos com Recursos.

---

### Fluxo funcional integrado

Operações administrativas de acesso atravessam essas três entidades de forma contínua.

---

### Redução de contratos runtime

Separação aumentaria contratos entre MFEs e necessidade de sincronização de estado e navegação.

---

### Custo operacional

Mais MFEs implicariam:

- mais pipelines
- mais versionamento
- mais pontos de falha
- mais governança

Sem ganho proporcional de isolamento arquitetural.

---

## Consequências

### Positivas

- maior coesão funcional
- boundary de domínio claro
- menor chatter entre MFEs
- menos contratos inter-remotes
- navegação interna local
- ownership unificado de segurança

### Negativas

- deploy não independente entre papéis, permissões e recursos
- mudanças são liberadas em conjunto

---

## Regra de Boundary Aplicada

O boundary de microfrontend foi definido por:

coesão funcional + taxa de mudança conjunta + fluxo integrado

e não por entidade de dados isolada.






