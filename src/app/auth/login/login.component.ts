import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  emailVerify!: boolean | undefined;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private msgService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
    })
  }

  onSubmit(event: any) {
    if(this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
        this.authService.afAuth.authState.subscribe(data => {
          console.log(data?.emailVerified,'emailVerified')
          this.emailVerify = data?.emailVerified
          if(!this.emailVerify) {
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'E-Mail nicht verifiziert'});
          }
        })
      })
    }
  }

  toRegister() {
    this.router.navigate(['register']);
  }

}
