import { Input, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-toast',
  standalone: true,
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();
}
