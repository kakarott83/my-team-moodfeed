import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FireService } from '../../services/fire';
import { UserService } from '../../services/shared/user.service';
import { UtilitiesService } from '../../services/shared/utilities.service';
import { Subscription, fromEvent, sampleTime } from 'rxjs';
import { TimerService } from '../../services/shared/timer.service';
import { StopWatch } from '../../model/stop-watch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserService, UtilitiesService, TimerService]
})
export class HomeComponent implements OnInit {

  isLoggedIn!: boolean
  myUser: any
  items: any
  startStopBtn: boolean = false;
  breakBtn: boolean = false;
  stopTimerSubscription: Subscription = new Subscription();
  public stopwatch!: StopWatch;

  constructor(private authService: AuthService, private fire: FireService, private userService: UserService, private utilities: UtilitiesService, private timerService: TimerService) {
    this.stopTimerSubscription.add(
      this.timerService.stopWatch$.subscribe(
        (val: StopWatch) => {
          this.stopwatch = val
        }
      )
    );
  }



  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    if(this.myUser) this.isLoggedIn = true;
    this.createItems();
  }

  createItems() {
    this.utilities.createDashboardCards().then(data => {
      this.items = data
    });
  }

  startStop() {
    this.startStopBtn = !this.startStopBtn;
    
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

  ngOnDestroy() {
    this.stopTimerSubscription.unsubscribe();
  }



}
