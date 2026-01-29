import {
  Component,
  TemplateRef,
  ViewChild,
  signal,
  AfterViewInit,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BarraDeBuscaComponent,
  PaginacaoBotoesComponent,
  DataTableComponent,
  TableColumn,
  ButtonComponent,
  TableResultsInfoComponent,
} from '@shared-ui';
import { PermissaoService } from 'projects/mf-access-control/src/service/permissao.service';

/**
 * Domínio
 */
type Permission = {
  id: string;
  identifier: string;
  description: string;
};

const PAGE_SIZE = 10;

@Component({
  selector: 'mfe-permissions-page',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    BarraDeBuscaComponent,
    DataTableComponent,
    PaginacaoBotoesComponent,
    ButtonComponent,
    TableResultsInfoComponent,
  ],
  templateUrl: './permissions.page.html',
})
export class PermissionsPage implements AfterViewInit {
  permissaoService = inject(PermissaoService);

  @ViewChild('identifierTpl', { static: true })
  identifierTpl!: TemplateRef<{ $implicit: Permission }>;

  @ViewChild('descriptionTpl', { static: true })
  descriptionTpl!: TemplateRef<{ $implicit: Permission }>;

  page = signal(1);
  totalPages = computed(() => Math.ceil(this.permissions().length / PAGE_SIZE));

  permissionsOriginal = signal<Permission[]>([]);
  permissionsVisiveis = computed<Permission[]>(() =>
    this.permissions().slice(this.from() - 1, this.from() + PAGE_SIZE)
  );
  permissions = signal<Permission[]>([]);
  // permissions = signal<Permission[]>([
  //   {
  //     id: '1',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '2',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '3',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '4',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '5',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '6',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '7',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '8',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '9',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '10',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '11',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '12',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '13',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '14',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   },
  //   {
  //     id: '15',
  //     identifier: 'add-usuario',
  //     description: 'Cadastra um novo usuário na plataforma.'
  //   },
  //   {
  //     id: '16',
  //     identifier: 'edit-usuario',
  //     description: 'Permite editar informações de um usuário.'
  //   }
  // ]);

  columns = signal<TableColumn<Permission>[]>([]);

  /** TableResultsInfo bindings */
  from = computed(() => (this.page() - 1) * PAGE_SIZE + 1);

  to = computed(() =>
    Math.min(this.page() * PAGE_SIZE, this.permissions().length)
  );

  total = computed(() => this.permissions().length);

  ngAfterViewInit(): void {
    this.permissaoService.getAllPermissoes().subscribe(permissoes => {
      this.permissionsOriginal.set(
        permissoes.conteudo.map(p => {
          return {
            identifier: p.nome,
            id: p.id,
            description: p.descricao,
          } as Permission;
        })
      );
      this.permissions.set(this.permissionsOriginal());
      this.columns.set([
        {
          key: 'identifier',
          header: 'Identificador',
          cellTemplate: this.identifierTpl,
        },
        {
          key: 'description',
          header: 'Descrição',
          cellTemplate: this.descriptionTpl,
        },
      ]);
    });
  }

  onPageChange(page: number): void {
    this.page.set(page);
  }

  onSearch(_: string): void {
    this.page.set(1);
  }

  onCreate(): void {}
}
