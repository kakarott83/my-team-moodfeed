import { Component, OnInit } from '@angular/core';
import { Reason } from '../../../model/reason';
import { FireService } from '../../../services/fire';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reason-list',
  templateUrl: './reason-list.component.html',
  styleUrl: './reason-list.component.scss'
})
export class ReasonListComponent implements OnInit {

  reasonList!: Reason[]


  constructor(private fire: FireService, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.createReasonList()
  }

  createReasonList() {
    this.fire.getAllReason().subscribe(data => {
      this.reasonList = data
    
      
    } )
  }

  selectReason(item: any) {
    this.dataService.selectedReason.next(item);
  }


  deleteReason(id: string) {

    this.fire.deleteReason(id)
    .then(() => { 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gelöscht'}); 
    }
    )
    .catch(error =>  {
      this.messageService.add({ severity: 'danger', summary: 'Error', detail: error }); 
    })
  }

}
