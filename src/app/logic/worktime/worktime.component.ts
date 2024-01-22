import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Worktime } from '../../model/worktime';
import { UserService } from '../../services/shared/user.service';
import { MessageService } from 'primeng/api';
import { map, tap } from 'rxjs';
import { FireService } from '../../services/fire';
import { UtilitiesService } from '../../services/shared/utilities.service';
import moment from 'moment';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { UserData } from '../../model/user-data';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrl: './worktime.component.scss',
  providers: [UserService, MessageService,UtilitiesService]
})
export class WorktimeComponent implements OnInit {

  myWorkTimeForm!: FormGroup;
  myWorktime: Worktime = {};
  myUser!: User;
  date!: Date;
  myWorktimeList: Worktime[] = [];
  myWorktimeList2: Worktime[] = [];
  isLoading = false;
  duration: any;
  myUserData: UserData = {}
  isAdmin!: boolean
  isLead!: boolean
  isMember!: boolean

  constructor(
    public authService: AuthService,
    private fire: FireService, 
    private fb: FormBuilder, 
    private utilitiesService: UtilitiesService, 
    private messageService: MessageService) {}



  ngOnInit(): void {

    this.authService.user$.subscribe(data => {
      if(data) {
        this.myUserData = data[0]
        this.isAdmin = this.authService.isAdmin$
        this.isLead = this.authService.isTeamLead$
        this.isMember = this.authService.isTeamMember$
        this.myUser = this.authService.userAuth$

        if(this.myUser.uid) {
          this.fire.getWorkTimeByUser(this.myUser.uid).subscribe(data => {
            this.myWorktimeList = data;
          })
        }

        
    }})

    this.createWorktimeForm()

    this.myWorkTimeForm.valueChanges.subscribe(() => {
      this.changeFormValue();
    })

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
          this.messageService.add({ severity: 'success', summary: 'Arbeitszeit', detail: 'Arbeitszeit gespeichert'});
        })
    }

    console.log(this.myWorktime,'MyWorkTime')
    
  }

  createWorktimeForm() {
    return this.myWorkTimeForm = this.fb.group({
      start: new FormControl(),
      end:  new FormControl(),
      date: new FormControl(),
      break: new FormControl(),
      comment: new FormControl(),
    })
  }

  changeFormValue() {

    let startTime = this.myWorkTimeForm.controls['start'].value;
    let endTime = this.myWorkTimeForm.controls['end'].value;
    let breakTime = this.myWorkTimeForm.controls['break'].value;

    if(startTime !== null && endTime !== null) {
      this.duration = this.utilitiesService.calcTime(startTime,endTime,breakTime)
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

  delete(e: string) {
    this.fire.deleteWorktime(e)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Arbeitszeit wurde gelöscht' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Arbeitszeit konnte nicht gelöscht werden' });
      })
  }

}
