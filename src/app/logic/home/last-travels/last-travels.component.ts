import { Component, OnInit } from '@angular/core';
import { Travel } from '../../../model/travel';
import { DataService } from '../../../services/shared/data.service';
import { UtilitiesService } from '../../../services/shared/utilities.service';

@Component({
  selector: 'app-last-travels',
  templateUrl: './last-travels.component.html',
  styleUrl: './last-travels.component.scss'
})


export class LastTravelsComponent implements OnInit {

  travels!: Travel[]

  constructor(public dataService: DataService, public utiliesService: UtilitiesService) {
    dataService.lastXTravel$.subscribe(data => {
      this.travels = data
    })
  }

  ngOnInit(): void {
  }

  convertDate(date: any) {
    console.log("🚀 ~ LastTravelsComponent ~ convertDate ~ date:", date)
    date as Object
    return date.seconds * 1000
  }

}
