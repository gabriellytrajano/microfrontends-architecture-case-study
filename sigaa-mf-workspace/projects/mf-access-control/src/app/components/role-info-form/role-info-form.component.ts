import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpinnerComponent, ButtonComponent } from '@shared-ui';
import { PermissaoPickerComponent } from '../permissao-picker/permissao-picker.component';
import { Permissao } from 'projects/mf-access-control/src/models/permissao.model';

@Component({
  selector: 'app-role-info-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    SpinnerComponent,
    ButtonComponent,
    PermissaoPickerComponent,
  ],
  templateUrl: './role-info-form.component.html',
  styleUrl: './role-info-form.component.scss',
})
export class RoleInfoFormComponent {
  @Input()
  nome = '';
  @Input()
  descricao = '';
  @Input()
  color = '#4ade80';
  @Input({ required: true })
  editar!: boolean;
  @Input()
  permissoes: Permissao[] = [];

  loading: boolean = false;

  @Output()
  saved = new EventEmitter<{
    nome: string;
    descricao: string;
    permissoes: Permissao[];
  }>();

  doSave() {
    this.saved.emit({
      nome: this.nome,
      descricao: this.descricao,
      permissoes: this.permissoes,
    });
  }

  clear() {
    this.nome = '';
    this.descricao = '';
  }

  selecionarPermissao([permissao, checked]: [Permissao, boolean]) {
    if (!checked) {
      this.permissoes = this.permissoes.filter(x => x.id !== permissao.id);
    } else if (this.permissoes.find(x => x.id === permissao.id) === undefined) {
      this.permissoes = [...this.permissoes, permissao];
    }
  }
}
