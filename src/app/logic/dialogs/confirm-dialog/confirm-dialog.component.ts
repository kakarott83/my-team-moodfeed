import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit {

  @Input() display: boolean = false
  @Input() header!: string;
  @Input() message!: string;
  @Input() acceptButtonStyleClass: string = 'btn-accept'
  @Input() confirm: EventEmitter<any> = new EventEmitter();
  @Output() reject: EventEmitter<any> = new EventEmitter();

  //display: boolean = false;
  

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dataService: DataService
  ) {}


  ngOnInit(): void {
    this.showDialog()
  }

  showDialog() {
    this.confirmationService.confirm({
      header: 'Hallo',
      message: 'Welt',
      accept: () => {
        this.onConfirm()
      }
    })
  }

  onConfirm() {
    this.dataService.confirm$.next(true);
    this.confirm.emit();
    this.display = false;
    console.log('Confirm')
  }

  onReject() {
    this.reject.emit();
    this.display = false;
    console.log('Reject')
  }
}

