import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-thanks-dialog',
  templateUrl: './thanks-dialog.component.html',
  styleUrl: './thanks-dialog.component.scss'
})
export class ThanksDialogComponent implements OnInit {

  displayBasic!: boolean;

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit(): void {
  }

  closeDialog() {
    this.ref.close();
  }

}
