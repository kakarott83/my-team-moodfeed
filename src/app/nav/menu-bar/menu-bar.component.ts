import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[] | undefined;
  isLoggedIn!: boolean

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    //this.isLoggedIn = !!this.authService.afAuth.currentUser
    //console.log(this.authService.afAuth.currentUser, 'CurrentUserMenu')
    //console.log(this.isLoggedIn,'this.isLoggedIn')


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
