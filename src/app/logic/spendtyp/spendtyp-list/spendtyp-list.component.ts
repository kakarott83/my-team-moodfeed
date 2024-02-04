import { Component, OnInit } from '@angular/core';
import { SpendType } from '../../../model/spend-type';
import { FireService } from '../../../services/fire';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-spendtyp-list',
  templateUrl: './spendtyp-list.component.html',
  styleUrl: './spendtyp-list.component.scss'
})
export class SpendtypListComponent implements OnInit {

  spendTypeList!: SpendType[]

  constructor(private fire: FireService, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.createSpendTypeList()
  }

  createSpendTypeList() {
    this.fire.getAllSpendType().subscribe(data => {
      console.log("🚀 ~ SpendtypListComponent ~ this.fire.getAllSpendType ~ data:", data)
      
      this.spendTypeList = data
    } )
  }

  selectSpendType(item: any) {
    this.dataService.selectedSpendtyp.next(item);
  }

  deleteSpendType(id: string) {

    this.fire.deleteSpendType(id)
    .then(() => { 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gelöscht'}); 
    }
    )
    .catch(error =>  {
      this.messageService.add({ severity: 'danger', summary: 'Error', detail: error }); 
    })
  }





}
