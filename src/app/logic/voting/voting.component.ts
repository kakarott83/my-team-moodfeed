import { Component, OnInit } from '@angular/core';
import { Votingdetail } from '../../model/votingdetail';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent implements OnInit {

  itemList!: Votingdetail[]
  votingResult: any;

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemList = [
      {question: "Wie war deine Arbeitswoche?", rating: 0, id: "item1"},
      {question: "Wie ist deine persönliche Stimmung?", rating: 0, id: "item3"},
      {question: "Wie ist deine Arbeitbelastung?", rating: 0,id: "item3"},
      {question: "Wie schätzt du die Stimmung im Unternehmen ein?", rating: 0,id: "item4"},
      {question: "Wie war die Zusammenarbeit mit anderen Abteilungen?", rating: 0,id: "item5"},
    ]
  }

  getVotingResult(result: any) {
    console.log(result,'FromChild')
  }
}
