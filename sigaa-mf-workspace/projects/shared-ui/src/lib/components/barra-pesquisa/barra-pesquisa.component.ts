import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-barra-de-busca',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './barra-pesquisa.component.html',
})
export class BarraDeBuscaComponent {
  private fb = inject(FormBuilder);

  @Input({ required: true }) placeholder!: string;

  form = this.fb.nonNullable.group({
    query: [''],
  });

  @Output() pesquisar = new EventEmitter<string>();
  @Output() aoDigitar = new EventEmitter<string>();

  onSubmit(): void {
    this.pesquisar.emit(this.form.controls.query.value);
  }

  aoMudarValor(event: Event) {
    let nome = (event.target as HTMLInputElement).value;
    this.aoDigitar.emit(nome);
  }
}
