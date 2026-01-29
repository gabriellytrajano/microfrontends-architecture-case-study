import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TableColumn<T> = {
  key: keyof T | string;
  header: string;
  align?: 'left' | 'center' | 'right';
  cellTemplate?: TemplateRef<{ $implicit: T }>;
  width?: string;
};

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T extends {}> {
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input({ required: true }) data!: T[];
  @Input({ required: false }) tableLayout?: string;

  getCellValue(row: T, key: keyof T | string): unknown {
    return (row as any)[key];
  }
}
