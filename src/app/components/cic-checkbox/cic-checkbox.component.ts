import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-cic-checkbox',
  templateUrl: './cic-checkbox.component.html',
  styleUrl: './cic-checkbox.component.scss'
})
export class CicCheckboxComponent {

  @Input() initValue: boolean = false
  @Output() onChange = new EventEmitter<CheckboxChangeEvent>()

  selectCheckbox(event: CheckboxChangeEvent) {
    console.log("🚀 ~ CicCheckboxComponent ~ selectCheckbox ~ event:", event)
    
    this.onChange.emit(event)
  }

}
