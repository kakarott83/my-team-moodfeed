import { Component, OnInit } from '@angular/core';
import { FireService } from '../../services/fire';
import { map } from 'rxjs/operators';
import { Voting } from '../../model/voting';

@Component({
  selector: 'app-team-voting',
  templateUrl: './team-voting.component.html',
  styleUrl: './team-voting.component.scss'
})
export class TeamVotingComponent implements OnInit{

  votings?: Voting[]

  constructor(private fire: FireService) {
  }


  ngOnInit(): void {
    this.fire.getAllVotings().snapshotChanges()
    .pipe(
      map(changes => changes.map(c => 
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      ))
    )
    .subscribe(data => {
      this.votings = data
      console.log(this.votings, 'Votings')
    })
  }






}
