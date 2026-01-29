import { Component } from '@angular/core';

@Component({
  selector: 'lib-badge',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {}
