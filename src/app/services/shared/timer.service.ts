import { Injectable } from '@angular/core';
import {
  Observable,
  timer,
  Subject,
  BehaviorSubject,
  Subscription
} from "rxjs";
import { map, tap } from "rxjs/operators";
import { StopWatch } from '../../model/stop-watch';

@Injectable()


export class TimerService {

  private readonly initialTime = 0;

  private timer$: BehaviorSubject<number> = new BehaviorSubject(
    this.initialTime
  );
  private lastStopedTime: number = this.initialTime;
  private timerSubscription: Subscription = new Subscription();
  private isRunning: boolean = false;

  constructor() { }

  public get stopWatch$(): Observable<StopWatch> {
    return this.timer$.pipe(
      map((seconds: number): StopWatch => this.secondsToStopWatch(seconds))
    );
  }

  startCount(): void {
    if (this.isRunning) {
      return;
    }
    this.timerSubscription = timer(0, 1000) // Timer, so that the first emit is instantly (interval waits until the period is over for the first emit)
      .pipe(map((value: number): number => value + this.lastStopedTime))
      .subscribe(this.timer$); // each emit of the Observable will result in a emit of the BehaviorSubject timer$
    this.isRunning = true;
  }

  stopTimer(): void {
    this.lastStopedTime = this.timer$.value;
    this.timerSubscription.unsubscribe();
    this.isRunning = false;
  }

  resetTimer(): void {
    this.timerSubscription.unsubscribe();
    this.lastStopedTime = this.initialTime;
    this.timer$.next(this.initialTime);
    this.isRunning = false;
  }

  private secondsToStopWatch(second: number): StopWatch {
    let rest = second;
    const hours = Math.floor(second / 3600);
    rest = second % 3600;
    const minutes = Math.floor(rest / 60);
    rest = second % 60;

    return {
      hours: this.convertToNumberString(hours),
      minutes: this.convertToNumberString(minutes),
      seconds: this.convertToNumberString(second)
    };
  }

  private convertToNumberString(value: number): string {
    return `${value < 10 ? "0" + value : value}`;
  }

}
