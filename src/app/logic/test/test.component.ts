import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/shared/user.service';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/shared/utilities.service';
import { FireService } from '../../services/fire';
import { Worktime } from '../../model/worktime';
import { Travel } from '../../model/travel';
import { STATE } from '../../enums';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  providers: [UtilitiesService]
})
export class TestComponent implements OnInit  {

  userData: any
  weekDays: any
  myUser: any
  wt: any[] = []
  travels!: Travel[];
  travelsLast!: Travel[];

  constructor(
    private fire: FireService, 
    private userService: UserService, 
    public authService: AuthService, 
    private utilityService: UtilitiesService,
    ) {
      
      authService.user$.subscribe(data => {
        console.log("🚀 ~ TestComponent ~ data:", data)
        this.myUser = data
      })
      
  }


  ngOnInit(): void {
    this.getUserData()
  }

  async getUserData() {
    let user = await this.userService.getAllUserData()
  }

  async getWeek() {
    this.weekDays = this.utilityService.getWeekDays(7)

    let start = this.weekDays[0]
    let end = this.weekDays[this.weekDays.length -1]

    this.wt = await this.fire.getWorkTimeHours(this.myUser.userId, start, end);
    console.log("🚀 ~ TestComponent ~ getWeek ~ wt:", this.wt)
  }

  async getTravels() {
    this.travels = await this.fire.getTravelByUser(this.myUser.userId)

    console.log(this.travels.filter(x => x.state == STATE[0]).length,'Length')
    console.log(this.travels.filter(x => x.state == STATE[1]).length,'Length2')
    console.log(this.travels.filter(x => x.state == STATE[2]).length,'Length3')

    this.travels.filter(x => x.state == STATE[1]).forEach(x => {
      x.amount
    })



    console.log("🚀 ~ TestComponent ~ getTravels ~ travels:", this.travels)
  }

  async getLastTravels() {
    this.travelsLast = await this.fire.getTravelLastXByUser(this.myUser.userId, 2)
    console.log("🚀 ~ TestComponent ~ getLastTravels ~ travelsLast:", this.travelsLast)
  }





}
