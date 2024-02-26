import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-basic-dialog',
  templateUrl: './basic-dialog.component.html',
  styleUrl: './basic-dialog.component.scss'
})
export class BasicDialogComponent {

@Input() visible = false;
@Input() text = ''
@Output() closed = new EventEmitter<boolean>()

handleClose() {
  this.closed.emit(true)
}



}
