import { Component, OnInit } from '@angular/core';
import { Voting } from '../../../model/voting';
import { FireService } from '../../../services/fire';
import { Table } from 'primeng/table'
import { map, tap } from 'rxjs';
import { UserData } from '../../../model/user-data';
import { UserService } from '../../../services/shared/user.service';

@Component({
  selector: 'app-team-voting-list',
  templateUrl: './team-voting-list.component.html',
  styleUrl: './team-voting-list.component.scss',
  providers: [UserService]
})
export class TeamVotingListComponent implements OnInit {

  votings!: Voting[];
  myUser: any;
  myUserData: UserData = {};
  rating = 0;
  isLoading = false;
  comment: string = '';

  constructor(private fire: FireService, private userService: UserService) {}

  ngOnInit(): void {
    this.getVotingByTeam();
    this.myUser = this.userService.getUser();
    this.getAdditionalData();
  }

  getVotingByTeam() {
    this.isLoading = true;
    this.fire.getAllVotings().snapshotChanges()
      .pipe(
        map(changes => changes.map(x => 
          ({id: x.payload.doc.id, ...x.payload.doc.data()})
          )),
      )
      .subscribe(data => {
        this.votings = data
        console.log(this.votings,'voting-lis')
        this.isLoading = false;
      })
  }

  async getAdditionalData() {
    if(!!this.myUser) {
      await this.userService.getUserData(this.myUser.uid).then((data) => {
        this.myUserData = data[0];
      });
    }
  }

  sum(voting: any) {
    this.rating = 0;
    let array = voting.votings;
    for (let index = 0; index < array.length; index++) {
      this.rating += array[index].rating.value
    }

    this.rating = Math.round(this.rating/array.length)

    return this.rating
  }

  

  clear(table: Table) {
    table.clear();
}







}
