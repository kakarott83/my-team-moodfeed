import { Injectable } from '@angular/core';
import { UserData } from '../../model/user-data';
import { FireService } from '../fire';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from './data.service';
import { UserMetadata } from 'firebase/auth';
import moment from 'moment';

@Injectable()

export class UserService {

  constructor(private fire: FireService, public afs: AngularFirestore, private authService: AuthService, private dataService: DataService) { }

  getUser() {
    if(typeof localStorage.getItem('user') === 'string') {
      return JSON.parse(localStorage.getItem('user')!)
    }
    return null
  }

  getAuthUser() {
    return this.authService.getUserAuth()
  }

  //Use the function for AllUserInfo
  async getAllUserData() {
    let googleData = this.authService.getUserAuth()
    

    if(googleData !==null) {
      let result = await this.getUserData(googleData.uid);
      
      let meta: UserMetadata = googleData?.metadata;
      let appData = result[0]
      let userData = {
        uid: googleData.uid,
        email: googleData.email,
        emailVerified: googleData.emailVerified,
        creationTime: meta.creationTime,
        lastSignInTime: meta.lastSignInTime,
        name: appData.name,
        roles: appData.role.join(","),
        department: appData.department,
        verifyAdmin: appData.verifyAdmin
      }

      this.dataService.myUser$.next(userData)

      return userData
    }

    return null
  
  }

  createAdditionalData() {
    let data: UserData = {
      id: 'FPFXsc1uDTdYxyFltfnjOZoIiCG2',
      role: ['Team-Member','Admin','Team-Head']
    }

    this.fire.createUserData(data);
  }

  async getUserData(id: string): Promise<any> {
    return await firstValueFrom(this.fire.getUserDataByUserId(id).snapshotChanges()
    .pipe(
      map(changes => changes.map(c => ({
        id: c.payload.doc.id, ...c.payload.doc.data()})
      ))
    ))
  }

  async updateUserData(id: string, userData: any): Promise<any> {
    return await this.fire.updateUserData(id, userData)
  }
}
