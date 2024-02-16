import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/shared/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit  {

  userData: any

  constructor(private userService: UserService, public authService: AuthService) {

  }


  ngOnInit(): void {
    this.getUserData()
  }

  async getUserData() {
    let user = await this.userService.getAllUserData()
  }



}
