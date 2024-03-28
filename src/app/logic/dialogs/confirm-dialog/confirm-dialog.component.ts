import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {

  @Input() header!: string;
  @Input() message!: string;
  @Input() acceptButtonStyleClass: string = 'btn-accept'
  @Input() confirm: EventEmitter<any> = new EventEmitter();
  @Output() reject: EventEmitter<any> = new EventEmitter();

  display: boolean = false;
  

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}


  ngOnInit(): void {
  }

  showDialog() {
    this.display = true
  }

  onConfirm() {
    this.confirm.emit();
    this.display = false;
  }

  onReject() {
    this.reject.emit();
    this.display = false;
  }
}

