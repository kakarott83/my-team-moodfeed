import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrl: './reason.component.scss',
  providers: [DataService, MessageService]
})
export class ReasonComponent implements OnInit {

  constructor(private dataService: DataService, private messageService: MessageService) {}
  
  ngOnInit(): void {
  }



}
