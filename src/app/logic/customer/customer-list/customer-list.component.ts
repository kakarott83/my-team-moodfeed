import { Component, OnInit } from '@angular/core';
import { FireService } from '../../../services/fire';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';
import { Customer } from '../../../model/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {

  customerList!: Customer[];

  constructor(private fire: FireService, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.createCustomerList()
  }

  createCustomerList() {
    this.fire.getAllCustomer().subscribe(data => {
      this.customerList = data
    } )
  }

  selectCustomer(item: any) {
    this.dataService.selectedCustomer.next(item);
  }

  deleteCustomer(id: string) {

    this.fire.deleteCustomer(id)
    .then(() => { 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gelöscht'}); 
    }
    )
    .catch(error =>  {
      this.messageService.add({ severity: 'danger', summary: 'Error', detail: error }); 
    })
  }




}
