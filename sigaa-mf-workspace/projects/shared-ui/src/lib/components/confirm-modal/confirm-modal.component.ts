import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '@shared-ui';

@Component({
  selector: 'lib-confirm-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  @ViewChild('dialog')
  protected dialog!: ElementRef<HTMLDialogElement>;

  public title = input.required<string>();
  public subtitle = input.required<string>();
  public variant = input<'remove'>('remove');

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  public show() {
    this.dialog.nativeElement.showModal();
  }

  public close() {
    this.dialog.nativeElement.close();
  }

  protected onCancel() {
    this.cancel.emit();
    this.close();
  }

  protected onConfirm() {
    this.confirm.emit();
    this.close();
  }
}
