import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Recurso from 'projects/mf-access-control/src/models/recurso.model';
import { BreadcrumbComponent, DropdownComponent } from '@shared-ui';
import { Permissao } from 'projects/mf-access-control/src/models/permissao.model';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RecursoService } from 'projects/mf-access-control/src/service/recurso/recurso.service';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { PermissaoService } from 'projects/mf-access-control/src/service/permissao.service';

@Component({
  selector: 'app-editar-recurso',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DropdownComponent,
    CheckboxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-recurso.component.html',
  styleUrl: './editar-recurso.component.scss',
})
export class EditarRecursoComponent implements OnInit {
  router = inject(Router);
  recursoService = inject(RecursoService);
  permissaoService = inject(PermissaoService);
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  recurso?: Recurso;
  form = this.fb.group({
    descricao: [''],
    permissao: [''],
  });

  permissoesVisiveis = signal<Permissao[]>([]);
  permissoesSelecionadas = signal<Permissao[]>([]);
  dropdownAberto = signal(false);
  permissoesParaPesquisa: Permissao[] = [];

  constructor() {}

  ngOnInit(): void {
    let recursoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.recursoService
      .buscarRecurso(recursoId ?? '')
      .pipe(
        switchMap(recurso =>
          forkJoin({
            recurso: of(recurso),
            permissoesParaPesquisa: this.permissaoService.getAllPermissoes(),
          })
        )
      )
      .subscribe(result => {
        this.recurso = result.recurso;
        this.permissoesParaPesquisa = result.permissoesParaPesquisa.conteudo;

        this.form.setValue({
          descricao: this.recurso.descricao,
          permissao: '',
        });

        this.permissoesVisiveis.set(this.recurso.permissoes.map(p => p));
        this.permissoesSelecionadas.set(this.recurso.permissoes.map(p => p));
      });
  }

  pesquisarPermissao() {
    var permissaoNome = this.form.value.permissao;
    if (!permissaoNome?.trim()) {
      this.permissoesVisiveis.set(this.permissoesSelecionadas().map(p => p));
      return;
    }
    var tokens = permissaoNome.toLowerCase().split(' ');

    var resultadoBusca = this.permissoesParaPesquisa.filter(p =>
      tokens.every(t => p.nome.toLowerCase().indexOf(t) != -1)
    );
    this.permissoesVisiveis.set(resultadoBusca.slice(0, 10));
  }

  alternarSelecaoPermissao(permissao: Permissao) {
    let indicePermissao = this.permissoesSelecionadas().indexOf(permissao);
    if (indicePermissao != -1) {
      this.permissoesSelecionadas().splice(indicePermissao, 1);
    } else {
      this.permissoesSelecionadas().push(permissao);
    }
  }

  permissaoEstaSelecionada(permissao: Permissao) {
    return (
      this.permissoesSelecionadas()
        .map(p => p.id)
        .indexOf(permissao.id) != -1
    );
  }

  abrirDropdown() {
    this.dropdownAberto.set(true);
  }

  alternarEstadoDropdown() {
    const permissaoNomePesquisa = this.form.value.permissao;
    if (!permissaoNomePesquisa || permissaoNomePesquisa.length == 0) {
      this.permissoesVisiveis.set(this.permissoesSelecionadas().map(p => p));
    }
    this.dropdownAberto.set(!this.dropdownAberto());
  }

  salvar() {
    if (!this.recurso) return;
    this.recurso.descricao = this.form.value.descricao ?? '';
    this.recurso.permissoes = this.permissoesSelecionadas();
    this.recursoService
      .atualizarRecurso(this.recurso.id, this.recurso)
      .subscribe(recurso => {
        history.back();
      });
  }

  cancelar() {
    this.form.patchValue({
      descricao: this.recurso?.descricao,
      permissao: '',
    });
    this.permissoesSelecionadas.set(this.recurso?.permissoes ?? []);
  }

  voltar() {
    history.back();
  }
}
