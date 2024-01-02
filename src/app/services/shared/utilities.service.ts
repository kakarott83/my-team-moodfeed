import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()

export class UtilitiesService {

  constructor() { }

  getWeeksPerYear(year: number) {
    let weeksArr: string[] = [];
    let currWeek = moment().year(year).isoWeek()

    for (let index = 0; index < currWeek; index++) {
      let week = index + 1
      weeksArr.push(week.toString())
    }

    return weeksArr
  }
}
