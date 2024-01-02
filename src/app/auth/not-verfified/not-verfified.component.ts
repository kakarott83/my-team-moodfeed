import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-verfified',
  templateUrl: './not-verfified.component.html',
  styleUrl: './not-verfified.component.scss'
})
export class NotVerfifiedComponent {

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['login']);
  }
  
}
