import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

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
  constructor(private fb: FormBuilder, private router: Router) {
        
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  onSubmit(event: any) {
    console.log(this.loginForm.value)
    console.log(event);
    this.router.navigate(['voting']);
  }

}
