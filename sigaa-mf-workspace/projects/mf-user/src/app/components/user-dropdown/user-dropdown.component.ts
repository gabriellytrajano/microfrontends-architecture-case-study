import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  @Input({ required: true })
  editLink!: string | any[];

  @Output()
  remove = new EventEmitter<void>();

  isMenuActionsOpen = false;

  openMenu(): void {
    this.isMenuActionsOpen = true;
  }

  closeMenu(): void {
    this.isMenuActionsOpen = false;
  }

  toggleMenu(): void {
    this.isMenuActionsOpen = !this.isMenuActionsOpen;
  }

  onRemove(): void {
    this.remove.emit();
    this.closeMenu();
  }
}
