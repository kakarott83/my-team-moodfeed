import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/shared/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
  providers: [UserService]
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[] | undefined;
  isLoggedIn!: boolean;
  myUser: any;

  constructor(private router: Router, public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    console.log(this.myUser);
    if(this.myUser) this.isLoggedIn = true;

    this.items = [
      {
        label: 'Home',
        icon: 'fa-solid fa-home',
        routerLink: 'home'
      },
      {
        label: 'Bewertung',
        icon: 'fa-regular fa-face-smile',
        routerLink: 'voting'
      },
      {
        label: 'Team',
        icon: 'fa-solid fa-people-group',
        routerLink: 'team-voting'
      },
      {
        label: 'Admin',
        icon: 'fa-solid fa-screwdriver-wrench',
        routerLink: 'admin'
      },
    ]
  }

  logout() {
    this.authService.signOut();
  }

  userProfile() {
    this.router.navigate(['user-profile']);
    
  }
}
