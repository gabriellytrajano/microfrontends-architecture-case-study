import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleInfoFormComponent } from '../../../components/role-info-form/role-info-form.component';
import { RoleToastComponent } from '../../../components/role-toast/role-toast.component';
import { BreadcrumbComponent } from '@shared-ui';
import { FuncaoService } from 'projects/mf-access-control/src/service/funcao.service';
import { firstValueFrom } from 'rxjs';
import { Permissao } from 'projects/mf-access-control/src/models/permissao.model';

@Component({
  selector: 'app-new-role',
  standalone: true,
  imports: [
    FormsModule,
    RoleInfoFormComponent,
    RoleToastComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './new-role.component.html',
  styleUrl: './new-role.component.scss',
})
export class NewRoleComponent {
  @ViewChild('toastOk')
  private toastOk!: RoleToastComponent;
  @ViewChild('toastErr')
  private toastErr!: RoleToastComponent;

  private service = inject(FuncaoService);

  onSave(
    form: RoleInfoFormComponent,
    {
      nome,
      descricao,
      permissoes,
    }: { nome: string; descricao: string; permissoes: Permissao[] }
  ) {
    form.loading = true;
    firstValueFrom(
      this.service.createFuncao({
        nome,
        descricao,
        permissaoIds: permissoes.map(f => f.id),
        usuarioIds: [],
      })
    )
      .then(() => {
        this.toastOk.show();
        form.clear();
      })
      .catch(() => {
        this.toastErr.show();
      })
      .finally(() => {
        form.loading = false;
      });
  }
}
