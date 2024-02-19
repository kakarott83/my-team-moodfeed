import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FireService } from '../../services/fire';
import { UserService } from '../../services/shared/user.service';
import { UtilitiesService } from '../../services/shared/utilities.service';
import { Subscription, fromEvent, sampleTime } from 'rxjs';
import { StopWatch } from '../../model/stop-watch';
import { TimerService } from '../../services/shared/timer.service';
import { UserData } from '../../model/user-data';
import { DataService } from '../../services/shared/data.service';
import { Travel } from '../../model/travel';
import { STATE } from '../../enums';
import { AggCard } from '../../model/aggCard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserService, UtilitiesService, TimerService]
})
export class HomeComponent implements OnInit {

  isLoggedIn!: boolean
  myUser: any
  myUserNew: any
  myUserData!: UserData
  items: any = []
  startStopBtn: boolean = false;
  breakBtn: boolean = false;
  stopTimerSubscription: Subscription = new Subscription();
  public stopwatch!: StopWatch;
  weekDays: any;
  wt: any[] = [];
  weekData!: any[];
  wtHours: number = 0;
  travels!: Travel[];
  travelsLast!: Travel[];
  agg: AggCard = {}

  constructor(
    public authService: AuthService, 
    private fire: FireService, 
    private userService: UserService,
    private utilities: UtilitiesService, 
    private timerService: TimerService,
    private dataService: DataService) {

    

    this.stopTimerSubscription.add(
      this.timerService.stopWatch$.subscribe(
        (val: StopWatch) => {
          this.stopwatch = val
        }
      )
    );
  }



  async ngOnInit() {
    this.myUser = await this.userService.getAllUserData()
    //Worktime generieren
    this.weekDays = this.utilities.getWeekDays(7)
    let start = this.weekDays[0]
    let end = this.weekDays[this.weekDays.length -1]
    this.weekData = await this.fire.getWorkTimeHours(this.myUser.uid, start, end);
    this.wtHours = this.calcWt(this.weekData)
    this.dataService.wtData$.next(this.weekData);

    //Travel generieren
    this.travels = await this.fire.getTravelByUser(this.myUser.uid);
    this.travelsLast = this.sortLast(this.travels, 5)
    this.agg = this.calcTravel(this.travels)
    this.dataService.travelData$.next(this.agg)
    this.dataService.lastXTravel$.next(this.travelsLast)




    //Cards generieren
    this.items = await this.utilities.createDashboardCards(this.myUser, this.wtHours, this.agg)

    
  }

  startStop() {
    this.startStopBtn = !this.startStopBtn;
    console.log('Click')
    
    /*Starten*/
    if(this.startStopBtn) {
      this.timerService.startCount();
    }

    /*Stopen*/
    if(!this.startStopBtn) {
      this.timerService.stopTimer();
    }

  }

  reset() {
    this.startStopBtn = false;
    this.timerService.resetTimer();
  }

  break() {
    this.breakBtn = !this.breakBtn

    /*Stopen*/
    if(this.breakBtn) {
      this.timerService.stopTimer();
    }

    /*Weiter*/
    if(!this.breakBtn) {
      this.timerService.startCount();
    }
  }

  sortLast(travels: Travel[], lastX: number) {
    return travels.sort((a, b) => {
      const aDate = a.date ?? []
      const bDate = b.date ?? []
      return (aDate[0] < bDate[0]) ? -1 : (aDate[0] > bDate[0]) ? 1 : 0
    }).slice(0, lastX)
  }

  calcWt(weekData: any): number {
    //console.log("🚀 ~ HomeComponent ~ calcWt ~ weekData:", weekData)
    let sum = 0
    for (let index = 0; index < weekData.length; index++) {
      sum += weekData[index]
    }
    return Number(sum.toFixed(2))

  }

  calcTravel(travels: Travel[]) {
    let sum = 0
    //Eingereichte und nicht bezahlte Reisen
    this.travels.filter(x => x.state == STATE[1]).forEach(x => {
      sum += x.amount == undefined ? 0 : x.amount
    })


   return {
      countPaid: travels.filter(x => x.state == STATE[2]).length,
      countSubmit: travels.filter(x => x.state == STATE[1]).length,
      countSaved: travels.filter(x => x.state == STATE[0]).length,
      sumOpen: sum
    }
  }





}
