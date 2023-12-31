import { Injectable } from '@angular/core';
import moment from 'moment';
import { Card } from '../../model/card';
import { AuthService } from '../auth.service';
import { FireService } from '../fire';
import { UserService } from './user.service';
import { map } from 'rxjs';
import { UserData } from '../../model/user-data';

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

  createDashboardCards(): Promise<Card[]> {

    return new Promise((resolve, reject) => {
      this.myUser = this.userService.getUser();
      console.log(this.myUser,'MyUser')
      console.log(new Date(Number(this.myUser.lastLoginAt)).toLocaleString('de-DE', { hour12: false}),'MyUser3')
      this.user = this.authService.getUserAuth();
      this.getAdditionalData().then(() => {
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

      });
    })
    
  }

  async getAdditionalData() {
    if(!!this.myUser) {
      await this.userService.getUserData(this.myUser.uid).then((data) => {
        this.myUserData = data[0];
      });
    }
  }
  


}
