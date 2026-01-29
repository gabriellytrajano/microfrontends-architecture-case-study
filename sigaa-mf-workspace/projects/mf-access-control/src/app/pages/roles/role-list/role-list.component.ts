import {
  AfterViewInit,
  Component,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  BadgeComponent,
  BreadcrumbComponent,
  ButtonComponent,
  PaginacaoBotoesComponent,
  SpinnerComponent,
  TableColumn,
  TableResultsInfoComponent,
  ConfirmModalComponent,
} from '@shared-ui';
import { RouterLink } from '@angular/router';
import { RoleDropdownComponent } from '../../../components/role-dropdown/role-dropdown.component';
import { FuncaoService } from 'projects/mf-access-control/src/service/funcao.service';
import { catchError, EMPTY } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FuncaoDTO } from 'projects/mf-access-control/src/models/funcao.model';
import { RoleTableComponent } from './role-table/role-table.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    BadgeComponent,
    RouterLink,
    RoleDropdownComponent,
    RoleDropdownComponent,
    BreadcrumbComponent,
    ButtonComponent,
    PaginacaoBotoesComponent,
    AsyncPipe,
    SpinnerComponent,
    RoleTableComponent,
    TableResultsInfoComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
})
export class RoleListComponent implements AfterViewInit {
  @ViewChild('nomeTpl', { static: true })
  nomeTpl!: TemplateRef<{ $implicit: FuncaoDTO }>;

  @ViewChild('menuTpl', { static: true })
  menuTpl!: TemplateRef<{ $implicit: FuncaoDTO }>;

  @ViewChild('permissoesTpl', { static: true })
  permissoesTpl!: TemplateRef<{ $implicit: FuncaoDTO }>;

  columns: TableColumn<FuncaoDTO>[] = [];

  ngAfterViewInit() {
    this.columns = [
      {
        key: 'nome',
        header: 'Papel',
        cellTemplate: this.nomeTpl,
      },
      {
        key: 'descricao',
        header: 'Descrição',
      },
      {
        key: 'permissoes',
        header: 'Permissões',
        cellTemplate: this.permissoesTpl,
      },
      {
        key: '...',
        header: '',
        align: 'right',
        cellTemplate: this.menuTpl,
      },
    ];
  }

  private service = inject(FuncaoService);

  curPage: number = 1;
  setPage(page: number) {
    this.curPage = page;
    this.funcoes$ = this.reloadFuncoes();
  }

  error = false;
  funcoes$ = this.reloadFuncoes();

  protected reloadFuncoes() {
    this.error = false;
    return this.service.getAllFuncoes({ pagina: this.curPage - 1 }).pipe(
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }

  @ViewChild('removeDialog')
  protected removeDialog!: ConfirmModalComponent;
  private funcaoRemove?: FuncaoDTO;

  onRemove(funcao: FuncaoDTO) {
    this.funcaoRemove = funcao;
    this.removeDialog.show();
  }

  onConfirmRemove() {
    if (this.funcaoRemove) {
      this.service.deleteFuncao(this.funcaoRemove.id).subscribe(() => {
        this.funcoes$ = this.reloadFuncoes();
      });
    }
    this.funcaoRemove = undefined;
  }
}
