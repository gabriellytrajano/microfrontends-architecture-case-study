import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleInfoFormComponent } from '../../../components/role-info-form/role-info-form.component';
import { RoleToastComponent } from '../../../components/role-toast/role-toast.component';
import { BreadcrumbComponent, SpinnerComponent } from '@shared-ui';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, firstValueFrom, Observable, switchMap } from 'rxjs';
import { FuncaoDTO } from 'projects/mf-access-control/src/models/funcao.model';
import { FuncaoService } from 'projects/mf-access-control/src/service/funcao.service';
import { AsyncPipe } from '@angular/common';
import { Permissao } from 'projects/mf-access-control/src/models/permissao.model';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
    FormsModule,
    RoleInfoFormComponent,
    RoleToastComponent,
    BreadcrumbComponent,
    AsyncPipe,
    SpinnerComponent,
  ],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.scss',
})
export class EditRoleComponent {
  @ViewChild('toastOk')
  private toastOk!: RoleToastComponent;
  @ViewChild('toastErro')
  private toastErro!: RoleToastComponent;

  private route = inject(ActivatedRoute);
  private service = inject(FuncaoService);

  protected funcao$!: Observable<FuncaoDTO>;
  protected error = false;

  ngOnInit() {
    this.funcao$ = this.route.paramMap.pipe(
      switchMap(map => {
        const id = map.get('id')!;
        return this.service.getOneFuncao(id);
      }),
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }

  onSave(
    form: RoleInfoFormComponent,
    funcao: FuncaoDTO,
    {
      nome,
      descricao,
      permissoes,
    }: { nome: string; descricao: string; permissoes: Permissao[] }
  ) {
    form.loading = true;
    const permissaoIds = permissoes.map(p => p.id);
    const updated = { ...funcao, nome, descricao, permissaoIds };
    firstValueFrom(this.service.updateFuncao(funcao.id, updated))
      .then(() => {
        this.toastOk.show();
      })
      .catch(() => {
        this.toastErro.show();
      })
      .finally(() => {
        form.loading = false;
      });
  }
}
