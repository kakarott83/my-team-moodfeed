import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Worktime } from '../../model/worktime';
import { UserService } from '../../services/shared/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrl: './worktime.component.scss',
  providers: [UserService, MessageService]
})
export class WorktimeComponent implements OnInit {

  myWorkTimeForm!: FormGroup;
  myWorktime: Worktime = {};
  myUser: any;
  date!: Date;

  constructor(private fb: FormBuilder, private userService: UserService, private elRef: ElementRef, private msgService: MessageService) {}


  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    this.myWorkTimeForm = this.fb.group({
      start: new FormControl(),
      end:  new FormControl(),
      date: new FormControl(),
      break: new FormControl(),
      comment: new FormControl(),
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

    console.log(this.myWorktime,'MyWorkTime')
    this.msgService.add({ severity: 'success', summary: 'Arbeitszeit', detail: 'Arbeitszeit gespeichert'});
  }

  selectedDate(e: any, input: string) {

    if(input == 'input') {
      this.date = e
    } else {
      this.myWorkTimeForm.patchValue({
        date: this.date,
      })
    }

    console.log(this.elRef)
  }

}
