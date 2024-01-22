import { Injectable, NgZone  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { doc, getDoc } from "firebase/firestore";
import { Router } from '@angular/router';
import { GoogleAuthProvider, User, getAuth, updateProfile } from 'firebase/auth';
import { UserService } from './shared/user.service';
import { UserData } from '../model/user-data';
import { FireService } from './fire';
import { BehaviorSubject, Observable, Observer, Subject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData!: any;
  public user$!: Observable<UserData | null>;
  public userAuth$!: any;
  public isLoggedIn$!: false;
  public isAdmin$ = new BehaviorSubject<boolean>(false);
  public isTeamLead$ = new BehaviorSubject<boolean>(false);
  public isTeamMember$ = new BehaviorSubject<boolean>(false);

  constructor(public afAuth: AngularFireAuth,private fire: FireService, public afs: AngularFirestore, public ngZone: NgZone, public router: Router) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }});

    this.user$ =this.afAuth.authState
      .pipe(
        switchMap(result => {
          if(result) {
            return this.afs.collection<UserData>('userdata', ref => {
              return ref.where('userId','==',result.uid)
            }).snapshotChanges()
                .pipe(
                  map(usr => ({
                    id: usr[0].payload.doc.id,
                    ...usr[0].payload.doc.data()
                  })
                  ),
                  tap(x => {
                    console.log("🚀 ~ AuthService ~ constructor ~ x: User", x)
                    this.isAdmin(x)
                    this.hasRole(x)
                    this.auth()
                  })
                )
          } else {
            return of(null)
          }
                  
        }
        )
      )

    // Sign in with email/password
  }

  isAdmin(usr: UserData) {
    let a = usr.role?.find(x => (x == 'Admin'))      
    if(a !== '') {
      this.isAdmin$.next(a !== undefined ? true : false);
    }
  }

  hasRole(usr: UserData) {
    usr.role?.forEach(x => {
      console.log(x,'Role')
      switch (x.toUpperCase()) {
        case 'ADMIN':
          this.isAdmin$.next(true)
          break;
        case 'TEAM-LEAD':
          this.isTeamLead$.next(true)
          break;
        case 'TEAM-MEMBER':
          this.isTeamMember$.next(true)
          break;
      
        default:
          break;
      }
    })
  }

  auth() {
    const auth = getAuth();
    this.userAuth$ = auth.currentUser;
  }

  // Sign in with email/password
  signIn(email: string, password: string) {

    return this.afAuth
     .signInWithEmailAndPassword(email, password)
     .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
  })
    .catch((error) => {
    window.alert(error.message);
    });
  }

  // Sign up with email/password
  signUp(email: string, password: string, displayName: string, department: string) {

    return this.afAuth
     .createUserWithEmailAndPassword(email, password)
     .then((result) => {
    /* Call the SendVerificaitonMail() function when new user sign
    up and returns promise */
     this.sendVerificationMail();
     this.setUserData(result.user);
     this.setAdditionalData(result.user, displayName, department)
    })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {

    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {

    return this.afAuth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    })
    .catch((error) => {
      window.alert(error);
    })
  }

  // Returns true when user is looged in and email is verified
  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }



  // Sign in with Google
  googleAuth() {
    return this.AuthLogin(new GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {

    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
    }

  /* Setting up user data when sign in with username/password */
  setUserData(user: any, displayName?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
      );

    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true
    });    
  }

  setAdditionalData(user: any, displayName: string, department: string) {
    const userAdditionalData: UserData = {
      department: department,
      userId: user.uid,
      name: displayName,
      role: [],
      verifyAdmin: false
    }

    this.fire.createUserData(userAdditionalData);
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['logout']);
      });
  }

  getUserAuth() {
    let auth = getAuth();
    let user = auth.currentUser;

    if(user !== null) {
      return user.providerData;
    }

    return null;
  }

  updateUserProfile(userData: any): Promise<any> {
    let auth = getAuth();
    let user = auth.currentUser
    
    return new Promise((resolve, reject) => {
      if(user) {
        console.log(user, 'User');
        updateProfile(user, {displayName: userData.displayName})
        .then((result) => resolve(result))
        .catch((error) => reject(error))
      }
    })
  }




}
