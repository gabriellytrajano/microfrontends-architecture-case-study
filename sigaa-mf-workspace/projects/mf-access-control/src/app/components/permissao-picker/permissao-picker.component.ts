import {
  AfterViewInit,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { DropdownComponent } from '@shared-ui';
import { Permissao } from 'projects/mf-access-control/src/models/permissao.model';
import { PermissaoService } from 'projects/mf-access-control/src/service/permissao.service';

@Component({
  selector: 'app-permissao-picker',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './permissao-picker.component.html',
})
export class PermissaoPickerComponent implements AfterViewInit {
  permissoesAtivas = input.required<Permissao[]>();
  selecionar = output<[Permissao, boolean]>();

  open: boolean = false;

  abrir() {
    this.open = true;
  }

  toggle() {
    this.open = !this.open;
  }

  permissaoService = inject(PermissaoService);
  permissoes = signal<Permissao[]>([]);
  ngAfterViewInit(): void {
    this.permissaoService.getAllPermissoes().subscribe(res => {
      this.permissoes.set(res.conteudo);
    });
  }

  protected ehSelecionada(id: string): boolean {
    return this.permissoesAtivas().find(perm => perm.id === id) !== undefined;
  }

  protected onChange(permissao: Permissao, event: Event) {
    const target = event.target! as HTMLInputElement;
    const checked = target.checked;
    this.selecionar.emit([permissao, checked]);
    target.checked = !target.checked;
  }
}
