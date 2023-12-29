import { Component, OnInit } from '@angular/core';
import { Votingdetail } from '../../model/votingdetail';
import { Voting } from '../../model/voting';
import moment from 'moment';
import { FireService } from '../../services/fire';
import { map } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThanksDialogComponent } from '../thanks-dialog/thanks-dialog.component';
import { Route, Router } from '@angular/router';
import { UserData } from '../../model/user-data';
import { UserService } from '../../services/shared/user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  providers: [DialogService, UserService]
})
export class VotingComponent implements OnInit {

  //uuidv4 = require('uuid/v4')

  itemList!: Votingdetail[]
  votingResults: Votingdetail[] = [];
  voting!: Voting;
  department!: string;
  week = moment().isoWeek().toString();
  comment = '';
  submitted = false;
  myUser: any
  myUserData: UserData = {}

  ref: DynamicDialogRef | undefined;

  start = moment(Date.now()).startOf('week').isoWeekday(1).format("DD.MM.yyyy")
  end = moment(Date.now()).endOf('week').isoWeekday(0).format("DD.MM.yyyy")

  constructor(private fire: FireService, public dialogService: DialogService, private router: Router, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getItemsFromAf();
    this.myUser = this.userService.getUser();
    this.getAdditionalData();

    console.log(this.myUser,'MyUser')
    console.log(this.myUserData,'MyUserData')
  }

  getItemsFromAf() {
    this.fire.getAllQuestions().snapshotChanges()
      .pipe(
        map(changes => changes.map(x => 
          ({id: x.payload.doc.id, ...x.payload.doc.data()})
        ))
      )
      .subscribe(data => {
      this.itemList = data;
    });
  }

  createVoting() {
    return this.voting = {
      department: this.myUserData.department,
      votingWeek: this.week,
      votings: this.votingResults,
      comment: this.comment,
      //id: Math.floor(Math.random() * 100).toString()
    }
  }

  getVotingResult(result: any) {
    const index = this.votingResults.findIndex(x => x == result)

    //Find and Replace Or Add
    if(index >= 0) {
      this.votingResults.splice(index,1,result);
    } else {
      this.votingResults.push(result);
    }
  }



  submitVoting() {
    let myVoting = this.createVoting();
    console.log(myVoting);

    this.fire.createVoting(myVoting)
      .then(() => {
        console.log('Saved')
        this.submitted = false;
        this.showDialog();
      })


  }

  showDialog() {
    this.ref = this.dialogService.open(ThanksDialogComponent, {header: 'Danke'});

    this.ref.onClose.subscribe(() => {
      console.log('Closed')
      this.router.navigate(['home']);
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
