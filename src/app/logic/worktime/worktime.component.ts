import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Worktime } from '../../model/worktime';
import { UserService } from '../../services/shared/user.service';
import { MessageService } from 'primeng/api';
import { map, tap } from 'rxjs';
import { FireService } from '../../services/fire';
import { UtilitiesService } from '../../services/shared/utilities.service';
import moment from 'moment';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrl: './worktime.component.scss',
  providers: [UserService, MessageService,UtilitiesService]
})
export class WorktimeComponent implements OnInit, OnChanges {

  myWorkTimeForm!: FormGroup;
  myWorktime: Worktime = {};
  myUser: any;
  date!: Date;
  myWorktimeList: Worktime[] = [];
  isLoading = false;
  duration: any;

  constructor(
    private fire: FireService, 
    private fb: FormBuilder, 
    private userService: UserService, 
    private utilitiesService: UtilitiesService, 
    private msgService: MessageService) {}



  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    this.myWorkTimeForm = this.fb.group({
      start: new FormControl(),
      end:  new FormControl(),
      date: new FormControl(),
      break: new FormControl(),
      comment: new FormControl(),
    })
    this.getWorktimes(this.myUser.uid)
    this.myWorkTimeForm.valueChanges.subscribe(value => {
      this.changeFormValue();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges')
  }

  submit() {
    this.myWorktime = {
      userId: this.myUser.uid,
      date: this.myWorkTimeForm.controls['date'].value.toString(),
      start: this.myWorkTimeForm.controls['start'].value,
      end: this.myWorkTimeForm.controls['end'].value,
      break: this.myWorkTimeForm.controls['break'].value,
      comment: this.myWorkTimeForm.controls['comment'].value,
    }

    if(this.myWorktime) {
      this.fire.createWorktime(this.myWorktime)
        .then(() => {
          this.msgService.add({ severity: 'success', summary: 'Arbeitszeit', detail: 'Arbeitszeit gespeichert'});
        })
    }

    console.log(this.myWorktime,'MyWorkTime')
    
  }

  changeFormValue() {

    let startTime = this.myWorkTimeForm.controls['start'].value;
    let endTime = this.myWorkTimeForm.controls['end'].value;
    let breakTime = this.myWorkTimeForm.controls['break'].value;

    if(startTime !== null && endTime !== null) {
      this.duration = this.utilitiesService.calcTime(startTime,endTime,breakTime)
    }
  }

  getWorktimes(userId: string) {
    if(userId) {
      this.isLoading = true;
      this.fire.getWorkTimeByUserId(userId).snapshotChanges()
        .pipe(
          map(changes => changes.map(x => 
            ({id: x.payload.doc.id, ...x.payload.doc.data()})
            )),
        )
        .subscribe(data => {
          this.myWorktimeList = data
          console.log(this.myWorktimeList,'WorktimeList')
          this.isLoading = false;
        })
    } else {
      console.log('UserId fehlt','Error')
    }
  }

  selectedDate(e: any, input: string) {

    if(input == 'input') {
      this.date = e
    } else {
      this.myWorkTimeForm.patchValue({
        date: this.date,
      })
    }
  }

}
