# Micro Frontends – PoC

## Introdução

A técnica de **Micro Frontends** se baseia na fragmentação de aplicações frontend extensas em elementos menores e mais simplificados. Esses elementos podem ser desenvolvidos, implantados e mantidos de forma independente, enquanto são apresentados ao usuário final como um produto único e integrado.

Cada fragmento pode residir em **projetos distintos**, **repositórios diferentes** e ser gerenciado por **equipes independentes**. Por exemplo, um time de produto pode trabalhar com Angular, o time de checkout com React e outro domínio com Vue, sem que isso impeça a composição final da aplicação.

---

## Estrutura Prática da PoC

A Prova de Conceito (PoC) adota a seguinte estrutura:

### Shell (Aplicação Principal)

O **Shell** atua como o container da aplicação.  
É responsável por:

- Orquestrar os microfrontends;
- Gerenciar a navegação;
- Carregar dinamicamente os módulos remotos (`mfe1`, `mfe2`) por meio das configurações de `module-federation.config.js`.

O Shell é o **ponto de entrada da aplicação** e pode ser acessado diretamente pelo navegador.

---

### MFE App 1 (Microfrontend 1)

O **MFE App 1** é um microfrontend independente que exporta um módulo ou componente consumido pelo Shell.

Na PoC, ele contém um botão simples que, ao ser acionado, redireciona o usuário para o **MFE App 2**, demonstrando a comunicação e integração entre aplicações separadas.

---

### MFE App 2 (Microfrontend 2)

O **MFE App 2** é outro microfrontend isolado, também registrado como remoto no Shell.

Ele representa uma segunda aplicação carregada sob demanda, reforçando os conceitos de:
- separação de responsabilidades;
- modularidade arquitetural;
- carregamento dinâmico.

---

### Shared Library (Lib)

A **Shared Library** é uma biblioteca compartilhada entre o Shell e os microfrontends, utilizada para armazenar:

- componentes comuns;
- serviços;
- utilitários reutilizáveis.

Essa abordagem reduz duplicação de código e garante consistência visual e comportamental entre os módulos.

---

## Module Federation (Webpack 5)

O **Module Federation**, introduzido no Webpack 5, é uma das abordagens mais utilizadas para implementação de arquiteturas de Micro Frontends.

Ele permite que uma aplicação carregue dinamicamente módulos de outra em tempo de execução, possibilitando também o compartilhamento de dependências (como bibliotecas comuns) para evitar duplicação.

Essa estrutura demonstra como uma aplicação Angular pode ser dividida em partes menores e independentes, mantendo comunicação entre elas por meio do Module Federation.

Cada microfrontend possui seu **próprio ciclo de desenvolvimento e implantação**, permitindo que equipes diferentes trabalhem de forma paralela e realizem deploys independentes, sem impactar o sistema como um todo.

---

## Cenários indicados

A adoção de Micro Frontends é mais vantajosa quando:

- A aplicação é complexa e de grande porte (ex: ERPs, e-commerces, dashboards corporativos);
- Existem equipes diferentes responsáveis por domínios distintos da aplicação;
- O backend já está estruturado em microserviços ou funções serverless;
- Há planejamento de longo prazo para escalar o sistema e adicionar novas funcionalidades;
- A organização busca reduzir o impacto de atualizações e aumentar a frequência de entrega.

---

## Quando não é recomendado

Apesar das vantagens, Micro Frontends podem introduzir complexidade desnecessária em alguns contextos.

Essa abordagem **não é indicada** quando:

- O projeto é pequeno e mantido por uma única equipe;
- O frontend é simples e possui poucas rotas ou funcionalidades;
- A infraestrutura de CI/CD ainda não está bem estabelecida;
- Não há necessidade de deploys independentes entre as partes da aplicação.

---

## Conclusão

A abordagem de Micro Frontends pode oferecer benefícios significativos, mas requer um esforço considerável de implementação e governança.

Antes de adotá-la, é fundamental compreender seus conceitos, vantagens, desafios e limitações. Além disso, fatores como cultura organizacional, estrutura das equipes e dinâmica de trabalho impactam diretamente o sucesso dessa arquitetura.

Portanto, a adoção de Micro Frontends não deve ser vista apenas como uma decisão arquitetural, mas como um **processo de transformação**, que exige alinhamento técnico e organizacional.

---

## Exemplo de Arquitetura da Aplicação

![Diagrama de Micro Frontends](https://martinfowler.com/articles/micro-frontends/card.png)
*Fonte: Martin Fowler – Micro Frontends*

## Referências

- [Micro Frontends – Como e por que adotar (Medium)- Lorena Carla](https://medium.com/@lorenamelor/micro-frontends-ac0e5d87582a)
- [Micro Frontends – Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)