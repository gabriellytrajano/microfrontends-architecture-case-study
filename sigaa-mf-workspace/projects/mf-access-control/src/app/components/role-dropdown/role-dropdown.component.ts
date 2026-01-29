import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './role-dropdown.component.html',
})
export class RoleDropdownComponent {
  @Input({ required: true })
  editLink!: string;
  @Output()
  remove = new EventEmitter<void>();

  @HostBinding('attr.open')
  protected openAttr: null | '' = null;
  @ViewChild('dialog')
  private dialog!: ElementRef<HTMLDialogElement>;

  public show() {
    this.dialog.nativeElement.show();
    this.openAttr = '';
  }

  public close() {
    this.dialog.nativeElement.close();
    this.openAttr = null;
  }

  protected onRemove() {
    this.remove.emit();
    this.close();
  }

  ngAfterViewInit() {
    this.dialog.nativeElement.addEventListener('close', () => {
      this.openAttr = null;
    });
  }
}
