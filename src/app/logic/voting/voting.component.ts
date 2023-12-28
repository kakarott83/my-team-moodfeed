import { Component, OnInit } from '@angular/core';
import { Votingdetail } from '../../model/votingdetail';
import { Voting } from '../../model/voting';
import moment from 'moment';
import { FireService } from '../../services/fire';
import { map } from 'rxjs/operators';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThanksDialogComponent } from '../thanks-dialog/thanks-dialog.component';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  providers: [DialogService]
})
export class VotingComponent implements OnInit {

  //uuidv4 = require('uuid/v4')

  itemList!: Votingdetail[]
  votingResults: Votingdetail[] = [];
  voting!: Voting;
  department = 'Boch'; /*It Comes from User*/
  week = '4';
  comment = '';
  submitted = false;

  ref: DynamicDialogRef | undefined;

  start = moment(Date.now()).startOf('week').isoWeekday(1).format("DD.MM.yyyy")
  end = moment(Date.now()).endOf('week').isoWeekday(0).format("DD.MM.yyyy")

  constructor(private fire: FireService, public dialogService: DialogService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getItemsFromAf();
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
      department: this.department,
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
}
