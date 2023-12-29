import { Injectable } from '@angular/core';
import { UserData } from '../../model/user-data';
import { FireService } from '../fire';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable()

export class UserService {

  constructor(private fire: FireService, public afs: AngularFirestore) { }

  getUser() {
    if(typeof localStorage.getItem('user') === 'string') {
      return JSON.parse(localStorage.getItem('user')!)
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

  getUserData(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fire.getUserDataByUserId(id).snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id, ...c.payload.doc.data()})
        ))
      )
      .subscribe(data => {
        resolve(data);
      })
    }) 
  }

  updateUserData(id: string, userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fire.updateUserData(id, userData)
        .then(() => {
          resolve('ok');
        })
        .catch((error) => {
          reject(error);
        })

    })
  }
}
