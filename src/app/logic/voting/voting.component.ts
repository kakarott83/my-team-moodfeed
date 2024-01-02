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
import { CalculateRatingService } from '../../services/calculate-rating.service';
import { MessageService } from 'primeng/api';
import { UtilitiesService } from '../../services/shared/utilities.service';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  providers: [DialogService, UserService, CalculateRatingService, MessageService, UtilitiesService]
})
export class VotingComponent implements OnInit {

  //uuidv4 = require('uuid/v4')

  itemList!: Votingdetail[]
  votingResults: Votingdetail[] = [];
  voting!: Voting;
  department!: string;
  comment = '';
  submitted = false;
  myUser: any
  myUserData: UserData = {};
  weeks: number[] = [];
  years: number[] = [];
  selectedWeek = moment().isoWeek();
  selectedYear = new Date().getFullYear();

  ref: DynamicDialogRef | undefined;

  start = moment(Date.now()).startOf('week').isoWeekday(1).format("DD.MM.yyyy")
  end = moment(Date.now()).endOf('week').isoWeekday(0).format("DD.MM.yyyy")

  constructor(private fire: FireService, private utilities: UtilitiesService, private msgService: MessageService,private calcService: CalculateRatingService, public dialogService: DialogService, private router: Router, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getItemsFromAf();
    this.myUser = this.userService.getUser();
    this.getAdditionalData();
    this.createWeeks(this.selectedYear);
    this.createYear();




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

  createVoting(week: number) {
    this.votingResults

    return this.voting = {
      department: this.myUserData.department,
      votingWeek: week.toString(),
      votingYear: new Date().getFullYear().toString(),
      votings: this.votingResults,
      comment: this.comment,
      total: this.calcService.calculateRating(this.votingResults)
      //id: Math.floor(Math.random() * 100).toString()
    }
  }

  getVotingResult(result: any) {
    const index = this.votingResults.findIndex(x => x == result)

    console.log(index, 'Index')
    console.log(result, 'result')

    //Find and Replace Or Add Or Remove
    if(index >= 0) {
      if(result.rating.value == 0) {
        this.votingResults.splice(index,1);
      } else {
        this.votingResults.splice(index,1,result);
      }
    } else {
      if(result.rating.value == 0) {
        this.votingResults.splice(index,1);
      } else {
        this.votingResults.push(result);
      }
    }
  }



  submitVoting() {
    let myVoting = this.createVoting(this.selectedWeek);
    let checkValid
    console.log(myVoting.votings.length+' '+ this.itemList.length,'Check');

    if(myVoting.votings.length == this.itemList.length) {
      this.fire.createVoting(myVoting)
        .then(() => {
          console.log('Saved')
          this.submitted = false;
          this.showDialog();
        })
    } else {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Rating nicht vollständig'});
    }



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

  createWeeks(year: number) {
    let w = this.utilities.getWeeksPerYear(year);
    w.forEach(x => {
      this.weeks.push(Number(x))
    });
  }

  createYear() {
    for (let index = 0; index < 10; index++) {
      this.years.push(moment().year(2024).add(index,'y').year())
    }
  }

  changeWeek(e: any) {
    
  }


}
