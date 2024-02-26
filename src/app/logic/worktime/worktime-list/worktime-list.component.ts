import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Worktime } from '../../../model/worktime';
import moment from 'moment';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-worktime-list',
  templateUrl: './worktime-list.component.html',
  styleUrl: './worktime-list.component.scss'
})
export class WorktimeListComponent implements OnInit {

  data!: Worktime[]
  @Input() isLoading!: boolean;
  @Output() deleteWorkTime = new EventEmitter()

  constructor(private utiliesService: UtilitiesService, private dataService: DataService) {
    dataService.wtData$.subscribe(data => {
      this.data = data;
    })
  }

  ngOnInit(): void {
    
  }

  calcTime(item: Worktime) {
    if(item.start !== undefined && item.end !== undefined) {
      return this.utiliesService.calcTime(item.start, item.end, item.break)
    }
    return null
  }

  delete(id: string) {
    this.deleteWorkTime.emit(id);
  }

}
