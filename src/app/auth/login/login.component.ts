import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  /**
   *
   */
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
  }

  onSubmit(event: any) {
    if(this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password)
    }
  }

  toRegister() {
    this.router.navigate(['register']);
  }

}
