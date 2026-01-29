import { Component, Input } from '@angular/core';

type DropdownDimensions = {
  height?: string;
  width?: string;
  maxHeight?: string;
  maxWidth?: string;
  minHeight?: string;
  minWidth?: string;
};

@Component({
  selector: 'lib-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() open = false;
  @Input({ required: false }) topFull: boolean = true;
  @Input({ required: false }) rightZero: boolean = true;
  @Input({ required: false }) overflow: string = 'hidden';
  @Input({ required: false }) dimensions: DropdownDimensions = {
    minWidth: '180px',
  };
  @Input({ required: false }) paddingPadrao: boolean = true;
}
