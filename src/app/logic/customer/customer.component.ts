import { Component } from '@angular/core';
import { DataService } from '../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [MessageService]
})
export class CustomerComponent {

  constructor(private dataService: DataService, private messageService: MessageService) {}

}
