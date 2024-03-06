import { Injectable } from '@angular/core';
import moment from 'moment';
import { Card } from '../../model/card';
import { AuthService } from '../auth.service';
import { FireService } from '../fire';
import { UserService } from './user.service';
import { map } from 'rxjs';
import { UserData } from '../../model/user-data';
import { Worktime } from '../../model/worktime';
import { Travel } from '../../model/travel';
import { DataService } from './data.service';
import { AggCard } from '../../model/aggCard';
import { FormGroup } from '@angular/forms';
import { TravelDays } from '../../model/travelDays';
import { Customer } from '../../model/customer';

@Injectable()


export class UtilitiesService {

  roles!: any;
  user: any;
  myUserData: UserData = {}
  myUser: any

  constructor(private authService: AuthService, private fire: FireService, private userService: UserService, private dataService: DataService) {
    dataService.myUser$.subscribe(data => {
      this.myUser = data
    })
  }

  getWeeksPerYear(year: number) {
    let weeksArr: string[] = [];
    let currWeek = moment().year(year).isoWeek()

    for (let index = 0; index < currWeek; index++) {
      let week = index + 1
      weeksArr.push(week.toString())
    }

    return weeksArr
  }

  calcDuration(startDate: Date, endDate: Date) {
    let start = moment(startDate);
    let end = moment(endDate);
    let duration = moment.duration(end.diff(start));

    //Get Days
    let days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
    let daysFormatted = days ? `${days}d ` : ''; // if no full days then do not display it at all

    //Get Hours
    let hours = duration.hours();
    let hoursFormatted = `${hours}h `;

    //Get Minutes
    let minutes = duration.minutes();
    let minutesFormatted = `${minutes}m`;

    return [daysFormatted, hoursFormatted, minutesFormatted].join('');
  }

  calcRate(travel: Travel): number {
    //zum testen https://www.amz-steuer.de/reisekostenrechner/
  //console.log("🚀 ~ UtilitiesService ~ calcRate ~ travel:", travel)

    let amount = 0
    let reduce = 1

    if(
      travel.date !== undefined && 
      travel.customer !== undefined && 
      travel.customer.country !== undefined &&
      travel.customer.country.rate !== undefined &&
      travel.customer.country.halfRate !== undefined)
      {
      let start = moment(travel.date[0]);
      let end = moment(travel.date[1]);
      let duration = moment.duration(end.diff(start));
      let days = Math.floor(duration.asDays());
      let hours = duration.hours();
      let eatRate = 0
  
  
  
      //Frühstück 20%
      //Frühstück 20%
      //Frühstück 20%
      if(travel.breakfast) eatRate = travel.customer.country.rate * 0.2
      //Mittag 20%
      if(travel.launch) eatRate += travel.customer.country.rate *0.4
      //Abendessen 40%
      if(travel.dinner) eatRate += travel.customer.country.rate *0.4
  
      if(days == 0 && hours > 8) {
        amount = travel.customer.country.halfRate
      }
  
      if(days == 1) {
        amount = travel.customer.country.halfRate + travel.customer.country.halfRate - eatRate
      }
  
      if(days > 1) {
        //1. Tag
        amount = travel.customer.country.halfRate
  
        if(days > 1) {
          amount += (travel.customer.country.rate - eatRate) * (days - 1)
        }
  
        //Letzter tag
        amount += travel.customer.country.halfRate - eatRate
      }
    }


    return amount

  }

  calcTime(startTime: string, endTime: string, breakTime?: string) {
    let start = moment(startTime,"HH:mm");
    let end = moment(endTime,"HH:mm");
    //let breakDuration = moment(0,"HH:mm");
    let minutes = end.diff(start, 'minutes');
    let interval = moment().hour(0).minute(minutes);
    interval.subtract(breakTime,'minutes');
    return interval.format("HH:mm");
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

  getWeekDays (numberOfDay: number) {
    let week = []

    for (let index = 0; index < numberOfDay; index++) {
      week.push(moment().startOf('isoWeek').add(index,'day'))
    }

    return week
  }

  createDashboardCards(userData: any, worktime: number, aggTravel: AggCard): Card[] {
  console.log("🚀 ~ UtilitiesService ~ createDashboardCards ~ userData:", userData)

    let cards: Card[] = [
      {
        header: 'Letzter Login',
        icon: 'fa-solid fa-right-to-bracket',
        body: userData?.lastSignInTime,
        footer: 'angemeldet seit',
        subFooter: userData?.creationTime,
        btnAction: ''
      },
      {
        header: 'Rolle',
        icon: 'fa-solid fa-user-tag',
        body: userData?.roles,
        footer: 'zum Userprofile',
        btnAction: ''
      },
      {
        header: 'Arbeitszeit',
        icon: 'fa-solid fa-clock',
        body: `${worktime}h von 40h gearbeitet`,
        footer: 'Heute gearbeitet',
        btnAction: ''
      },
      {
        header: 'Reisekosten (draft)',
        icon: 'fa-solid fa-plane',
        body: `Ausstehender Betrag ${aggTravel.sumOpen}€`,
        footer: `${aggTravel.countSaved} Reise(n) gespeichert`,
        btnAction: ''
      },
    ]

    return cards
    
  }

  async getAdditionalData() {
    if(!!this.myUser) {
      await this.userService.getUserData(this.myUser.uid).then((data) => {
      });
    }
  }

  findIcon(name: string | undefined) {
    let base = "../../../../assets/images/"
    let result

    if(name == undefined) return base + "unternehmen.png"

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

  createDays(travel: FormGroup) {
    //https://www.amz-steuer.de/reisekostenrechner/
    if(travel.controls['dateRange'].value !== null) {
      console.log("🚀 ~ UtilitiesService ~ createDays ~ travel:", travel.controls['dateRange'].value)
      //console.log("🚀 ~ UtilitiesService ~ createDays ~ travel:", travel.controls['customer'].value)
      let start = moment(travel.controls['dateRange'].value[0])
      let startHours = start.hours()
      let end = moment(travel.controls['dateRange'].value[1])
      let endHours = end.hours()
      let daysDiff = end.diff(start,'days');
      let days = []
      let customer: Customer = {...travel.controls['customer'].value}
  
      /*First Element*/
      let day = start
        days.push({
          date: day.toDate(),
          amount: daysDiff == 0 && (endHours - startHours) < 8 ? 0 : customer.country?.halfRate,
          totalAmount: daysDiff == 0 && (endHours - startHours) < 8 ? 0 : customer.country?.halfRate,
          fullAmount: daysDiff == 0 && (endHours - startHours) < 8 ? 0 : customer.country?.rate,
          breakfast: false,
          launch: false,
          dinner: false
        })

  
      /*next Element*/
      for (let index = 0; index < daysDiff; index++) {
        let rate = 0
        let halfRate = 0
        let breakfastCost = 0
        /*Abzug Frühstück*/
        if(customer.country?.rate !== undefined && customer.country?.halfRate !== undefined) {
          breakfastCost = parseFloat((customer.country?.rate * 0.2).toFixed(2))
          rate = parseFloat((customer.country?.rate).toFixed(2)) - breakfastCost
          halfRate = parseFloat((customer.country?.halfRate).toFixed(2)) - breakfastCost
        }


        days.push({
          date: day.add(1,'days').toDate(),
          amount: index + 1 == daysDiff ? customer.country?.halfRate : customer.country?.rate,
          totalAmount: index + 1 == daysDiff ? halfRate : rate,
          fullAmount: customer.country?.rate,
          breakfast: true,
          launch: false,
          dinner: false
        })
      }
      
  
      this.dataService.travelsDay$.next(days);

    }
  }

  calcDayRate(fullAmount: number | undefined, breakfast: boolean | undefined, launch: boolean | undefined, dinner: boolean | undefined) {
    let breakfastCosts = 0
    let dinnerCosts = 0
    let launchCosts = 0
    let result = 0
    if(fullAmount) {
      breakfastCosts = fullAmount * (breakfast ? 0.2 : 0)
      launchCosts = fullAmount * (launch ? 0.4 : 0)
      dinnerCosts = fullAmount * (dinner ? 0.4 : 0)

      if(breakfast) {
        result = breakfastCosts
      }

      if(launch) {
        result = result + launchCosts
      }

      if(dinner) {
        result = result + dinnerCosts
      }

      return result < 0 ? 0 : result
    }



    return result
  }
  


}
