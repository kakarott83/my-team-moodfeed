import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { VotingService } from '../../services/voting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isLoggedIn!: boolean

  constructor(private authService: AuthService, private votingService: VotingService) {}

  ngOnInit(): void {
    //this.isLoggedIn = !!this.authService.afAuth.currentUser
    const userId = localStorage.getItem('user')
    console.log(userId);
  }



}
