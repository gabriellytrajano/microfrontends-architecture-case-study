import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-paginacao-botoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginacao.component.html',
})
export class PaginacaoBotoesComponent {
  totalPages = input.required<number>();
  currentPage = input.required<number>();
  window = input<number>(5);

  @Output() pageChange = new EventEmitter<number>();

  previous() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  next() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goTo(page: number) {
    this.pageChange.emit(page);
  }

  protected pages = computed(() => {
    const half = Math.floor(this.window() / 2);
    let start = Math.max(1, this.currentPage() - half);
    let end = Math.min(this.totalPages(), start + this.window() - 1);
    start = Math.max(1, end - this.window() + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  });

  protected isFirst = computed(() => this.currentPage() === 1);
  protected isLast = computed(() => this.currentPage() === this.totalPages());
}
