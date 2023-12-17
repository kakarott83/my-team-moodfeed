import { Component, OnInit } from '@angular/core';
import { Votingdetail } from '../../model/votingdetail';
import { Voting } from '../../model/voting';
import moment from 'moment';
import { VotingService } from '../../services/voting.service';


@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent implements OnInit {

  //uuidv4 = require('uuid/v4')

  itemList!: Votingdetail[]
  votingResults: Votingdetail[] = [];
  voting!: Voting;
  department = 'FoMo'; /*It Comes from User*/
  week = '4';
  comment = '';
  submitted = false;

  start = moment(Date.now()).startOf('week').isoWeekday(1).format("DD.MM.yyyy")
  end = moment(Date.now()).endOf('week').isoWeekday(0).format("DD.MM.yyyy")

  constructor(private votingService: VotingService) {
    
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemList = [
      {question: "Wie war deine Arbeitswoche?", id: "item1"},
      {question: "Wie ist deine persönliche Stimmung?", id: "item2"},
      {question: "Wie ist deine Arbeitbelastung?", id: "item3"},
      {question: "Wie schätzt du die Stimmung im Unternehmen ein?", id: "item4"},
      {question: "Wie war die Zusammenarbeit mit anderen Abteilungen?", id: "item5"},
    ]
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

    this.votingService.createVoting(myVoting)
      .then(() => {
        console.log('Saved')
        this.submitted = false;
      })
  }
}
