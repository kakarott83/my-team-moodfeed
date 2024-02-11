import { Component } from '@angular/core';
import { DataService } from '../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
  providers: [DataService, MessageService]
})
export class CountryComponent {

  constructor(private dataService: DataService, private messageService: MessageService) {}

}
