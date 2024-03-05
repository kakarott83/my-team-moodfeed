import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TravelDays } from '../../../model/travelDays';
import { UtilitiesService } from '../../../services/shared/utilities.service';

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrl: './days-list.component.scss'
})
export class DaysListComponent implements OnInit {

  @Input() days: TravelDays[] | null = [];
  @Output() travelsDays = new EventEmitter<TravelDays[]>();
  @Output() travelRate = new EventEmitter<number>();

  constructor(private utilityService: UtilitiesService) {}

  ngOnInit() {
    this.days?.forEach(x => {
      console.log(x,'InitDay')
    })
  }


  changeRate(index: any) {
    console.log("🚀 ~ TravelFormComponent ~ changeRate ~ event:", event)
    if(this.days) {
      let row = this.days.at(index)
      if(row) {
        if(row.amount !== undefined) {
          let a = row.amount - this.utilityService.calcDayRate(row.fullAmount, row.breakfast, row.launch, row.dinner)
          row.totalAmount = a < 0 ? 0 : parseFloat(a.toFixed(2))
        }
      }
      this.days.forEach(day => {
        console.log(day, 'ChangeDay')
      })
      this.travelsDays.emit(this.days)
    }
  }


  

}
