import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-admin-pending',
  templateUrl: './verify-admin-pending.component.html',
  styleUrl: './verify-admin-pending.component.scss'
})
export class VerifyAdminPendingComponent {

  constructor(private authService: AuthService, private router: Router) {}


  backToLogin() {
    this.authService.signOut()
  }

}
