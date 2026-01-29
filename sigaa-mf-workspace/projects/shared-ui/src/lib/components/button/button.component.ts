import { Component, HostBinding, Input } from '@angular/core';

export type ButtonVariant = 'primary' | 'gray' | 'red';

@Component({
  selector: 'a[lib-button], button[lib-button]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input()
  @HostBinding('attr.data-variant')
  variant: ButtonVariant = 'primary';
}
