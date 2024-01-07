import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-voting-dialog',
  templateUrl: './voting-dialog.component.html',
  styleUrl: './voting-dialog.component.scss'
})
export class VotingDialogComponent {

  text!: string

  constructor(private config: DynamicDialogConfig, public ref: DynamicDialogRef) {
    this.text = config.data
  }

  closeDialog() {
    this.ref.close();
  }





}
