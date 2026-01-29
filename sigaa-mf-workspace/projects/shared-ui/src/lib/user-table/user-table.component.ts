import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '@shared-ui';
import { User } from '../models/user.model';

@Component({
  selector: 'lib-user-table',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  @Input({ required: true }) columns!: TableColumn<User>[];
  @Input({ required: true }) data!: User[];
}
