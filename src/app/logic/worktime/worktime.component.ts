import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Worktime } from '../../model/worktime';
import { UserService } from '../../services/shared/user.service';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrl: './worktime.component.scss',
  providers: [UserService]
})
export class WorktimeComponent implements OnInit {

  myWorkTimeForm!: FormGroup;
  myWorktime: Worktime = {};
  myUser: any;
  date!: Date;

  constructor(private fb: FormBuilder, private userService: UserService, private elRef: ElementRef) {}


  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    this.myWorkTimeForm = this.fb.group({
      start: new FormControl(),
      end:  new FormControl(),
      date: new FormControl(),
    })
  }

  submit() {
    this.myWorktime = {
      userId: this.myUser.uid,
      date: this.myWorkTimeForm.controls['date'].value.toString(),
      start: this.myWorkTimeForm.controls['start'].value,
      end: this.myWorkTimeForm.controls['end'].value
    }

    console.log(this.myWorktime,'MyWorkTime')
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
