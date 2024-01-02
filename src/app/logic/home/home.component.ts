import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FireService } from '../../services/fire';
import { UserService } from '../../services/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  isLoggedIn!: boolean
  myUser: any

  constructor(private authService: AuthService, private fire: FireService, private userService: UserService) {}

  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    if(this.myUser) this.isLoggedIn = true;
  }



}
