import { Injectable } from '@angular/core';
import moment from 'moment';
import { Card } from '../../model/card';
import { AuthService } from '../auth.service';
import { FireService } from '../fire';
import { UserService } from './user.service';
import { map } from 'rxjs';
import { UserData } from '../../model/user-data';
import { Worktime } from '../../model/worktime';

@Injectable()


export class UtilitiesService {

  roles!: any;
  user: any;
  myUserData: UserData = {}
  myUser: any

  constructor(private authService: AuthService, private fire: FireService, private userService: UserService) {}

  getWeeksPerYear(year: number) {
    let weeksArr: string[] = [];
    let currWeek = 4 // moment().year(year).isoWeek()

    for (let index = 0; index < currWeek; index++) {
      let week = index + 1
      weeksArr.push(week.toString())
    }

    return weeksArr
  }

  calcTime(startTime: string, endTime: string, breakTime?: string) {
    let start = moment(startTime,"HH:mm");
    let end = moment(endTime,"HH:mm");
    //let breakDuration = moment(0,"HH:mm");
    let minutes = end.diff(start, 'minutes');
    let interval = moment().hour(0).minute(minutes);
    interval.subtract(breakTime,'minutes');
    return interval.format("HH:mm");

    // let breakDuration = breakTime !== undefined ?  moment(breakTime,"HH:mm") : moment('00:00',"HH:mm");

    // let breakDiffHours = end.diff(breakDuration,'hours');
    // let breakDiffMinutes = end.diff(breakDuration,'minutes');
    // let breakClearMinutes = (breakDiffMinutes % 60);



    // let totalHours = moment(breakDiffHours,"HH:mm")
    // let totalMinutes = end.diff(start, 'minutes')
    // let clearMinutes = (totalMinutes % 60)


    
    // // let totalHours = end.diff(start, 'hours')
    // // let totalMinutes = end.diff(start, 'minutes')
    // // let clearMinutes = (totalMinutes % 60)



    // let m = moment().minute(clearMinutes)
    // m.hour(totalHours)

    // return m.format('HH:mm')
  }

  createDateArray(): Date[] {
    let datArr: Date[] = []
    let startDate = new Date()
    startDate.setHours(8)
    startDate.setMinutes(0)
    startDate.setSeconds(0)

    let endDate = new Date()
    endDate.setHours(18)
    endDate.setMinutes(0)
    startDate.setSeconds(0)

    datArr.push(startDate);
    datArr.push(endDate);

    return datArr
  }

  createDashboardCards(): Promise<Card[]> {

    return new Promise((resolve, reject) => {
      this.myUser = this.userService.getUser();
      this.user = this.authService.getUserAuth();
      this.authService.user$.subscribe(data => {
        if(data) {
          this.myUserData = data
          this.roles = this.myUserData.role?.join(",")
  
          let cards: Card[] = [
            {
              header: 'Letzter Login',
              icon: 'fa-solid fa-right-to-bracket',
              body: new Date(Number(this.myUser.lastLoginAt)).toLocaleString('de-DE', { hour12: false}),
              footer: 'angemeldet seit',
              subFooter: new Date(Number(this.myUser.createdAt)).toLocaleString('de-DE', { hour12: false}),
              btnAction: ''
            },
            {
              header: 'Rolle',
              icon: 'fa-solid fa-user-tag',
              body: this.roles,
              footer: 'zum Userprofile',
              btnAction: ''
            },
            {
              header: 'Arbeitszeit',
              icon: 'fa-solid fa-clock',
              body: '30h von 40h gearbeitet',
              footer: 'Heute gearbeitet',
              btnAction: ''
            },
            {
              header: 'Reisekosten (draft)',
              icon: 'fa-solid fa-plane',
              body: 'Ausstehender Betrag 51€',
              footer: '3 Reisen erfasst',
              btnAction: ''
            },
          ]
    
          resolve(cards);
        }
      })
    })
    
  }

  async getAdditionalData() {
    if(!!this.myUser) {
      await this.userService.getUserData(this.myUser.uid).then((data) => {
      });
    }
  }

  findIcon(name: string) {
    let base = "../../../../assets/images/"
    let result

    switch (name.toUpperCase()) {
      case "AIL":
        result = base + "ail.png"
        break;
      case "OBERBANK":
        result = base + "oberbank.svg"
        break;
      case "TFSAT":
        result = base + "tfsat.svg"
        break;
      case "CIC":
        result = base + "cic.png"
        break;
      case "BANK-NOW":
        result = base + "bnow.svg"
        break;
    
      default:
        result = base + "unternehmen.png"
        break;
    }

    return result
  }
  


}
