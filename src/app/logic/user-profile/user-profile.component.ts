import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/shared/user.service';
import { FireService } from '../../services/fire';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserData } from '../../model/user-data';
import { Role } from '../../model/role';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  providers: [MessageService, UserService]
})
export class UserProfileComponent implements OnInit {

  isLoggedIn!: boolean
  myUser: any
  displayName!: string;
  editDisplayName = false;
  editRole = false;
  disableVerfify = true;
  verifyAdmin!: boolean
  userForm!: FormGroup;
  userRoleForm!: FormGroup;
  user: any;
  myUserData: UserData = {}
  selectedRoles!: Role[];
  roles: string[] = [];

  constructor(private authService: AuthService, private fire: FireService, private userService: UserService, private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit(): void {
    this.myUser = this.userService.getUser();
    console.log(this.myUser);
    if(this.myUser) {
      this.isLoggedIn = true;
      this.displayName = this.myUser.providerData[0].displayName
    }

    this.user = this.authService.getUserAuth();
    this.getAdditionalData().then(() => {
      this.getRoles();
      this.createUserForm();
    });
    
    

  }

  createUserForm() {
    this.userForm = this.fb.group({
      displayName: new FormControl(this.myUserData.name, [Validators.required, Validators.minLength(3)]),
      role: new FormControl(this.myUserData.role, [Validators.required, Validators.minLength(3)])
    })
  }

  editUserName() {
    this.editDisplayName = true;
  }

  editUserRole() {
    this.editRole = true;
  }

  editVerifify() {
    this.disableVerfify = false;
  }

  saveDisplayName() {
    let userData = {
      displayName: this.userForm.get('displayName')?.value
    }

    this.authService.updateUserProfile(userData)
      .then((result) => {
        this.editDisplayName = false
        this.displayName = userData.displayName
        this.userForm.patchValue({
          displayName: userData.displayName
        })
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User aktualisiert' });
    })
      .catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fehler beim aktualisieren' });
      })
  }

  saveUserData() {
    console.log(this.myUserData,'myUserData')
    const id = this.myUserData.id

    if(!!id) {
      /*let userData = {
        department: this.myUserData.department,
        userId: this.myUserData.userId,
        role: this.userForm.get('role')?.value
      }*/

      let data = this.createUserData();

      this.fire.updateUserData(id, data)
        .then(() => {
          this.editRole = false
          this.disableVerfify = true
          this.getAdditionalData();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User aktualisiert' });
        })
        .catch((error) => {
          this.editRole = false
          this.disableVerfify = true
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fehler beim aktualisieren' });
        })
      
    }
  }

  saveVerifify() {
    let data = this.createUserData;

  }

  setAdditionalData() {
    this.userService.createAdditionalData();
  }

  async getAdditionalData() {
    if(!!this.myUser) {
      await this.userService.getUserData(this.myUser.uid).then((data) => {
        this.myUserData = data[0];
      });
    }
  }

  getRoles() {
    this.fire.getAllRoles().snapshotChanges()
      .pipe(
        map(changes => changes.map(c => 
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
          ))
      )
      .subscribe(data => {
        data.forEach(x => {
          if(x.name !== undefined)
          this.roles.push(x.name)
        })
      })
  }

  createUserData() {
    console.log(this.userForm.get('role')?.value);
    return {
      department: this.myUserData.department,
      userId: this.myUserData.userId,
      role: this.userForm.get('role')?.value !== '' ? this.userForm.get('role')?.value : this.myUserData.role,
      verifyAdmin: this.myUserData.verifyAdmin,
      name: this.userForm.get('displayName')?.value !== '' ? this.userForm.get('displayName')?.value : this.myUserData.name,
    }
  }





}
