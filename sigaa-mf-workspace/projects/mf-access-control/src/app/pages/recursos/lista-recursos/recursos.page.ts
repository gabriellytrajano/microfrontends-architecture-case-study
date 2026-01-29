import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  BreadcrumbComponent,
  BarraDeBuscaComponent,
  DataTableComponent,
  TableColumn,
  TableResultsInfoComponent,
  PaginacaoBotoesComponent,
  SpinnerComponent,
} from '@shared-ui';
import Recurso from 'projects/mf-access-control/src/models/recurso.model';
import { PermissoesRecursoComponent } from './permissoes-recurso/permissoes-recurso.component';
import { RecursoService } from 'projects/mf-access-control/src/service/recurso/recurso.service';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    BarraDeBuscaComponent,
    DataTableComponent,
    PermissoesRecursoComponent,
    TableResultsInfoComponent,
    PaginacaoBotoesComponent,
    SpinnerComponent,
  ],
  templateUrl: './recursos.page.html',
})
export class RecursosPage implements AfterViewInit {
  recursoService = inject(RecursoService);
  loading = signal(true);

  tamanhoPagina = 10;
  paginaAtual = signal(1);

  @ViewChild('modeloPermissoes', { static: true })
  modeloPermissoes!: TemplateRef<{ $implicit: Recurso }>;

  recursosOriginais = signal<Recurso[]>([]);
  recursos = signal<Recurso[]>([]);
  recursosVisiveis = signal<Recurso[]>([]);
  colunas = signal<TableColumn<Recurso>[]>([]);

  maisOpcoesVisivel = signal<boolean>(false);

  ngAfterViewInit(): void {
    this.recursoService.buscarTodosRecursos().subscribe(recursos => {
      this.recursosOriginais.set(recursos as any[]);
      this.recursos.set(this.recursosOriginais());
      this.onPageChange(1);
      console.log(this.modeloPermissoes);
      this.colunas.set([
        {
          key: 'nome',
          header: 'Identificador',
          width: '1/5',
        },
        {
          key: 'descricao',
          header: 'Descrição',
          width: '3/10',
        },
        {
          key: 'permissoes',
          header: 'Permissões Requeridas',
          width: '50%',
          cellTemplate: this.modeloPermissoes,
        },
      ]);
      this.loading.set(false);
    });
  }

  pesquisarPorRecurso(nome: string) {
    let tokens: string[] = nome.toLowerCase().split(' ');
    let recursosFiltrados: Recurso[] = [];
    let nomeMinusculo = nome.toLowerCase();
    for (const recurso of this.recursosOriginais() as Recurso[]) {
      let recursoNome = recurso.nome.toLowerCase();
      // if (recursoNome.indexOf(nomeMinusculo) != -1) {
      if (tokens.every(t => recursoNome.indexOf(t) != -1)) {
        recursosFiltrados.push(recurso);
      }
    }
    console.log(recursosFiltrados);
    this.recursos.set(recursosFiltrados);
    this.onPageChange(1);
  }

  alternarVisibilidadeMaisOpcoes() {
    this.maisOpcoesVisivel.set(this.maisOpcoesVisivel());
  }

  onPageChange($event: number) {
    this.paginaAtual.set($event);
    this.recursosVisiveis.set(this.recursos().slice(this.from(), this.to()));
  }

  page(): number {
    return this.paginaAtual();
  }

  totalPages(): number {
    return Math.ceil(this.recursos().length / this.tamanhoPagina);
  }

  total(): number {
    return this.recursos().length;
  }

  to(): number {
    return this.from() + this.tamanhoPagina;
  }

  from(): number {
    return (this.paginaAtual() - 1) * this.tamanhoPagina;
  }

  aoRemoverRecurso() {
    this.loading.set(true);
    this.recursoService.buscarTodosRecursos().subscribe(recursos => {
      this.recursosOriginais.set(recursos);
      this.loading.set(false);
    });
  }
}
