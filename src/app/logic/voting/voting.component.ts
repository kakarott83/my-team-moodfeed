import { Component, OnInit } from '@angular/core';
import { Votingdetail } from '../../model/votingdetail';
import { Voting } from '../../model/voting';
import moment from 'moment';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent implements OnInit {

  itemList!: Votingdetail[]
  votingResults: Votingdetail[] = [];
  voting!: Voting;
  department = 'FoMo'; /*It Comes from User*/
  week = '4';
  comment = '';

  start = moment(Date.now()).startOf('week').isoWeekday(1).format("DD.MM.yyyy")
  end = moment(Date.now()).endOf('week').isoWeekday(0).format("DD.MM.yyyy")

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemList = [
      {question: "Wie war deine Arbeitswoche?", id: "item1"},
      {question: "Wie ist deine persönliche Stimmung?", id: "item2"},
      {question: "Wie ist deine Arbeitbelastung?", id: "item3"},
      {question: "Wie schätzt du die Stimmung im Unternehmen ein?", id: "item4"},
      {question: "Wie war die Zusammenarbeit mit anderen Abteilungen in der CIC?", id: "item5"},
    ]
  }

  createVoting() {
    this.voting = {
      department: this.department,
      votingWeek: this.week
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

  }
}
