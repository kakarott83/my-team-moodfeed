import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createForm() {
    this.resetForm = this.fb.group({
      email: new FormControl('', Validators.required),
    })
  }

  sendResetLink() {
    if(this.resetForm.valid) {
      this.authService.forgotPassword(this.resetForm.value.email);
    }
  }

}
