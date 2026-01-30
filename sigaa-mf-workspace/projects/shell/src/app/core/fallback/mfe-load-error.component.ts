import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section role="alert">
      <h2>Módulo indisponível</h2>
      <p>Falha ao carregar microfrontend remoto.</p>
    </section>
  `,
})
export class MfeLoadErrorComponent {}