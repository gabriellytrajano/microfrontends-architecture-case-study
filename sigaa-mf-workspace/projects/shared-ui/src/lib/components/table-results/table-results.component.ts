import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-table-results-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-results.component.html',
})
export class TableResultsInfoComponent {
  @Input() from!: number;
  @Input() to!: number;
  @Input() total!: number;
  @Input() label: string = 'resultados';
}
