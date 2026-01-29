import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  contentChild,
  signal,
} from '@angular/core';

@Component({
  selector: 'lib-breadcrumb-component',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb-component.component.html',
})
export class BreadcrumbComponent {
  @Input({ required: true }) label!: string | string[];
  @Input({ required: false }) usarIconeAlternativo: boolean = false;

  labels: string[] = [];

  recuperarLabels(): string[] {
    if (this.labels.length > 0) return this.labels;
    if (typeof this.label == 'string') {
      this.labels = [this.label];
    } else {
      this.labels = this.label as string[];
    }
    return this.labels;
  }

  ehUltimaLabel(label: string): boolean {
    return label == this.recuperarLabels()[this.recuperarLabels().length - 1];
  }
}
