import {
  Component,
  OnInit,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import Recurso from 'projects/mf-access-control/src/models/recurso.model';
import { DropdownComponent } from '@shared-ui';
import { Router } from '@angular/router';
import { RecursoService } from 'projects/mf-access-control/src/service/recurso/recurso.service';

@Component({
  selector: 'permissoes-recurso',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './permissoes-recurso.component.html',
  styleUrl: './permissoes-recurso.component.scss',
})
export class PermissoesRecursoComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.recurso());
  }

  router = inject(Router);
  recursoService = inject(RecursoService);

  readonly recurso = input.required<Recurso | any>();
  maisOpcoesVisivel = signal<boolean>(false);
  recursoRemovido = output<void>();

  alternarVisibilidadeMaisOpcoes() {
    this.maisOpcoesVisivel.set(!this.maisOpcoesVisivel());
  }

  editarRecurso() {
    console.log('It is calling');
    this.router.navigate(['access-control', 'recursos', this.recurso().id]);
  }

  removerRecurso() {
    this.recursoService.removerRecurso(this.recurso().id).subscribe({
      complete: () => this.recursoRemovido.emit(),
      error: err => console.log(err),
    });
  }
}
