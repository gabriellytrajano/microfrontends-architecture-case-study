# Micro Frontends Architecture Case Study (Angular)

## Executive Summary

This repository documents a real-world architecture case study for a scalable academic management platform with potential national adoption.

I acted as Frontend Technical Lead, responsible for defining the frontend architecture, proposing and validating the use of Micro Frontends with Module Federation, and selecting Angular 17 as the core framework based on stability and enterprise suitability.

Despite being initially developed by a small team and under tooling and funding constraints, the architecture was intentionally designed to support long-term scalability, independent domain evolution, and organizational growth.

---

## Context & Problem

Legacy academic management systems used by Brazilian public universities are typically monolithic, tightly coupled, and poorly suited for modern usability and scalability requirements.

This project emerged as a proof of concept for a new platform intended to:
- support multiple public universities
- allow institutional autonomy
- scale across teams and domains
- evolve independently over time

The primary challenge was designing a frontend architecture capable of long-term maintainability and organizational scalability under institutional uncertainty and constrained resources.

---

## Constraints & Assumptions

### Institutional
- Initial deployment limited to a single university (UFCG)
- Future expansion dependent on governmental approval and funding (MEC)
- No predefined migration strategy from legacy systems

### Technical
- Backend designed around decoupled microservices
- Frontend required to support independent evolution of domains
- Architecture needed to remain flexible regarding adoption strategy

### Design & Tooling
- No initial government funding
- Design team operating with free-tier tools
- No access to paid UI kits or component libraries

As a result, all UI components were designed and implemented manually.

---

## Alternatives Considered

### Monolithic SPA
- Simpler initial setup
- High coupling and centralized deployment  
→ Rejected due to scalability risks

### Modular Monolith
- Improved internal structure
- Still a single deployment unit  
→ Insufficient for organizational scaling

### Micro Frontends with Module Federation
- Independent deployments
- Clear domain ownership
- Alignment with backend microservices  
→ Selected for validation despite higher complexity

---

## Architectural Decisions

- **Micro Frontends** were proposed and defended as a strategic choice to support long-term organizational scalability.
- **Module Federation (Webpack 5)** was selected for runtime composition and shared dependency management.
- **Angular 17** was chosen for framework maturity, stability, and enterprise readiness.
- A **Shared UI Library** was introduced early to centralize reusable components and ensure visual consistency under tooling constraints.

All frontend architectural decisions were led and validated by the Frontend Technical Lead.

---

## Technical Design

- **Shell Application**
  - Entry point
  - Routing orchestration
  - Dynamic loading of MFEs

- **Micro Frontends**
  - Isolated by functional domain
  - Independently deployed
  - No direct coupling between MFEs

- **Shared UI Library**
  - Reusable UI components
  - Consistent visual patterns
  - Manual implementation using semantic HTML and utility-based styling

Inter-MFE communication was intentionally limited to navigation boundaries.

---

## Trade-offs & Risks

- Increased architectural and operational complexity
- Need for governance and versioning discipline
- Higher initial setup cost compared to monolithic approaches

These trade-offs were consciously accepted based on the projected growth and institutional context.

---

## When I Would / Would Not Use This Again

Micro Frontends should not be chosen based on current team size, but on the expected trajectory of the system.

They are appropriate when long-term organizational scaling and independent evolution are expected, even if the initial team is small. They should be avoided when applications are expected to remain small and stable over time.

---

## Role & Responsibilities

**Frontend Technical Lead**
- Defined frontend architecture
- Proposed and validated Micro Frontend adoption
- Selected core technologies
- Led architectural decisions and codebase structure
- Guided junior contributors and task distribution
