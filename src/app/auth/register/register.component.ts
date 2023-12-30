import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import departments from '../../../assets/departments.json';

interface Depts {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  public departments: {name: string, code: string}[] = departments
  depts!: Depts[] | undefined

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.depts = departments.data
    console.log(this.depts,'Departmenrts')
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required),
      department: new FormControl('',Validators.required),
    })
  }

  signUp() {
    if (this.registerForm.valid) {
      this.authService.signUp(
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.displayName,
        this.registerForm.value.department?.code
      )
    }
  }

}
