import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Output() aoMudar = new EventEmitter<boolean>();
  @Input() selecionado = false;

  aoClicar() {
    console.log('Chamou');
    this.aoMudar.emit(!this.selecionado);
  }
}
