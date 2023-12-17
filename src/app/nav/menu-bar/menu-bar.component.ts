import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[] | undefined;
  logged = true;

  ngOnInit(): void {
    this.items = [
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
}
