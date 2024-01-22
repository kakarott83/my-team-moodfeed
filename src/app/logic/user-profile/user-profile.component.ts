import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/shared/user.service';
import { FireService } from '../../services/fire';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserData } from '../../model/user-data';
import { Role } from '../../model/role';
import { map } from 'rxjs';
import { User } from 'firebase/auth';

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
  myUserData2: UserData = {}
  myUser2: any
  selectedRoles!: Role[];
  roles: string[] = [];
  isAdmin!: boolean
  isLead!: boolean
  isMember!: boolean

  constructor(
    public authService: AuthService, 
    private fire: FireService, 
    private userService: UserService, 
    private fb: FormBuilder, 
    private messageService: MessageService) {}

  ngOnInit(): void {
    //this.myUser = this.userService.getUser();
    // console.log(this.myUser);
    // if(this.myUser) {
    //   this.isLoggedIn = true;
    //   this.displayName = this.myUser.providerData[0].displayName
    // }

    /*
      myUser2: any
      myUserData2: UserData = {}
      isAdmin!: boolean
      isLead!: boolean
      isMember!: boolean
      
      this.authService.user$.subscribe(data => {
      if(data) {
        this.myUserData2 = data[0]
        console.log("🚀 ~ UserProfileComponent ~ ngOnInit ~ myUserData2:", this.myUserData2)
        this.isAdmin = this.authService.isAdmin$
        this.isLead = this.authService.isTeamLead$
        this.isMember = this.authService.isTeamMember$
        this.myUser2 = this.authService.userAuth$
        console.log("🚀 ~ UserProfileComponent ~ ngOnInit ~ myUser2:", this.myUser2)
        this.createUserForm();
        this.getRoles();
      }
    })
    */

    this.authService.user$.subscribe(data => {
      if(data) {
        this.myUserData2 = data
        //this.isAdmin = this.authService.isAdmin$
        //this.isLead = this.authService.isTeamLead$
        //this.isMember = this.authService.isTeamMember$
        this.myUser2 = this.authService.userAuth$
        /*ToDo, keine separaten Variablen für Rolen*/
        this.createUserForm();
        this.getRoles();
      }
    })

    // this.user = this.authService.getUserAuth();
    // this.getAdditionalData().then(() => {
    //   this.getRoles();
    //   //this.createUserForm();
    // });
    
    

  }

  createUserForm() {
    this.userForm = this.fb.group({
      displayName: new FormControl(this.myUserData2.name, [Validators.required, Validators.minLength(3)]),
      role: new FormControl(this.myUserData2.role, [Validators.required, Validators.minLength(3)])
    })
  }

  cancel(field: string) {
    switch (field) {
      case 'editDisplayName':
        this.editDisplayName = false;
        break;
      case 'editRole':
        this.editRole = false;
        break;
      case 'disableVerfify':
        this.disableVerfify = true;
        break;
    
      default:
        break;
    }
  }

  edit(field: string) {
    switch (field) {
      case 'editDisplayName':
        this.editDisplayName = true;
        break;
      case 'editRole':
        this.editRole = true;
        break;
      case 'disableVerfify':
        this.disableVerfify = false;
        break;
    
      default:
        break;
    }
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
    console.log(this.myUserData2,'myUserData')
    const id = this.myUserData2.id

    if(!!id) {
      /*let userData = {
        department: this.myUserData.department,
        userId: this.myUserData.userId,
        role: this.userForm.get('role')?.value
      }*/

      let data = this.createUserData();
      console.log("🚀 ~ UserProfileComponent ~ saveUserData ~ data:", data)

      this.fire.updateUserData(id, data)
        .then(() => {
          this.editRole = false
          this.disableVerfify = true
          //this.getAdditionalData();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User aktualisiert' });
        })
        .catch((error) => {
          console.log("🚀 ~ UserProfileComponent ~ saveUserData ~ error:", error)
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

  // async getAdditionalData() {
  //   if(!!this.myUser) {
  //     await this.userService.getUserData(this.myUser.uid).then((data) => {
  //       this.myUserData = data[0];
  //     });
  //   }
  // }

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
    return {
      department: this.myUserData2.department,
      userId: this.myUserData2.userId,
      role: this.userForm.get('role')?.value !== '' ? this.userForm.get('role')?.value : this.myUserData2.role,
      verifyAdmin: this.myUserData2.verifyAdmin,
      name: this.userForm.get('displayName')?.value !== '' ? this.userForm.get('displayName')?.value : this.myUserData2.name,
    }
  }





}
