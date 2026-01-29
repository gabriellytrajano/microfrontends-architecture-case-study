import { Component, Input } from '@angular/core';
import { ToastComponent } from '@shared-ui';

@Component({
  selector: 'app-role-toast',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './role-toast.component.html',
})
export class RoleToastComponent {
  @Input()
  variant: 'ok' | 'error' = 'ok';

  visible: boolean = false;
  private timeoutID: number | undefined = undefined;

  public show() {
    this.visible = true;
    this.stopTimer();
    this.timeoutID = setTimeout(
      () => {
        this.close();
      },
      5000,
      null
    );
  }

  public close() {
    this.visible = false;
    this.stopTimer();
  }

  private stopTimer() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = undefined;
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
