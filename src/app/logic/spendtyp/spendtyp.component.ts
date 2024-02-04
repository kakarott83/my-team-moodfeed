import { Component } from '@angular/core';
import { DataService } from '../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-spendtyp',
  templateUrl: './spendtyp.component.html',
  styleUrl: './spendtyp.component.scss',
  providers: [DataService, MessageService]
})
export class SpendtypComponent {

  constructor(private dataService: DataService, private messageService: MessageService) {}

}
