import { Component, Input } from '@angular/core';
import { DataTableComponent, TableColumn } from '@shared-ui';
import { FuncaoDTO } from 'projects/mf-access-control/src/models/funcao.model';

@Component({
  selector: 'app-role-table',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './role-table.component.html',
})
export class RoleTableComponent {
  @Input({ required: true }) columns!: TableColumn<FuncaoDTO>[];
  @Input({ required: true }) data!: FuncaoDTO[];
}
