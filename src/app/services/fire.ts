import { Injectable } from '@angular/core';
import { Voting } from '../model/voting';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { collection, query, where } from "firebase/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Question } from '../model/question';
import { Department } from '../model/department';
import { UserData } from '../model/user-data';
import { Role } from '../model/role';
import { Worktime } from '../model/worktime';
import { Travel } from '../model/travel';
import { FileUpload } from '../model/file-upload';
import { Observable, finalize, from, tap } from 'rxjs';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})

//https://www.bezkoder.com/angular-16-firestore-crud/

export class FireService {
  private votingPath = '/votings'
  private questionPath = '/questions'
  private departmentPath = '/department'
  private userDataPath = '/userdata'
  private rolesPath = '/roles'
  private worktimePath = '/worktime'
  private travelPath = '/travels'
  private filePath = '/uploads'

  percentage!: Observable<number | undefined>;
  snapshot!: Observable<any>;
  downloadURL!: string;

  votingRef!: AngularFirestoreCollection<Voting>;
  questionsRef!: AngularFirestoreCollection<Question>;
  departmentRef!: AngularFirestoreCollection<Department>;
  userDataRef!: AngularFirestoreCollection<UserData>;
  rolesRef!: AngularFirestoreCollection<Role>;
  worktimeRef!: AngularFirestoreCollection<Worktime>;
  travelRef!: AngularFirestoreCollection<Travel>;
  //userRef!: AngularFirestoreDocument<UserData>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.votingRef = db.collection(this.votingPath);
    this.questionsRef = db.collection(this.questionPath);
    this.departmentRef = db.collection(this.departmentPath);
    this.userDataRef = db.collection(this.userDataPath);
    this.rolesRef = db.collection(this.rolesPath);
    this.worktimeRef = db.collection(this.worktimePath);
    this.travelRef = db.collection(this.travelPath);
    //this.userRef = db.doc(this.userDataPath);
  }

  /**************Voting Methods**************/
  getAllVotings(): AngularFirestoreCollection<Voting> {
    return this.votingRef;
  }

  createVoting(voting: Voting): any {
    return this.votingRef.add({ ...voting });
  }

  updateVoting(id: string, data: any) {
    return this.votingRef.doc(id).update(data);
  }

  deleteVoting(id: string) {
    return this.votingRef.doc(id).delete();
  }

  /**************Question Methods**************/

  getAllQuestions(): AngularFirestoreCollection<Question> {
    return this.questionsRef;
  }

  createQuestion(question: Question): any {
    return this.questionsRef.add({ ...question });
  }

  updateQuestion(id: string, data: any) {
    return this.questionsRef.doc(id).update(data);
  }

  deleteQuestion(id: string) {
    return this.questionsRef.doc(id).delete();
  }

  /**************Department Methods**************/

  getAllDepartments(): AngularFirestoreCollection<Department> {
    return this.departmentRef;
  }

  createDepartment(department: Department): any {
    return this.departmentRef.add({ ...department });
  }

  updateDepartment(id: string, data: any) {
    return this.departmentRef.doc(id).update(data);
  }

  deleteDepartment(id: string) {
    return this.departmentRef.doc(id).delete();
  }

  /**************User Methods**************/

  getAllUsers(): AngularFirestoreCollection<UserData> {
    return this.userDataRef;
  }


  getUserDataByUserId(id: string): AngularFirestoreCollection<UserData> {
    let data = this.db.collection<UserData>('userdata', ref => {
      return ref.where('userId', '==', id)
    })
    return data;
  }

  createUserData(userData: UserData): any {
    return this.userDataRef.add({ ...userData });
  }

  updateUserData(id: string, data: any) {
    console.log(id);
    return this.userDataRef.doc(id).update(data);
  }

  deleteUserData(id: string) {
    return this.userDataRef.doc(id).delete();
  }

  /**************Worktime Methods**************/

  getAllWorktimes(): AngularFirestoreCollection<Worktime> {
    return this.userDataRef;
  }


  getWorkTimeByUserId(id: string): AngularFirestoreCollection<Worktime> {
    let data = this.db.collection<Worktime>('worktime', ref => {
      return ref.where('userId', '==', id)
    })
    return data;
  }

  createWorktime(wt: Worktime): any {
    return this.worktimeRef.add({ ...wt });
  }

  updateWorktime(id: string, data: any) {
    console.log(id);
    return this.worktimeRef.doc(id).update(data);
  }

  deleteWorktime(id: string) {
    return this.worktimeRef.doc(id).delete();
  }

  /**************Worktime Travel**************/

  getAllTravels(): AngularFirestoreCollection<Travel> {
    return this.travelRef;
  }


  getTravelByUserId(id: string): AngularFirestoreCollection<Travel> {
    let data = this.db.collection<Travel>('travels', ref => {
      return ref.where('userId', '==', id)
    })
    return data;
  }

  createTravel(travel: Travel): any {
    return this.travelRef.add({ ...travel });
  }

  updateTravel(id: string, data: any) {
    console.log(id);
    return this.travelRef.doc(id).update(data);
  }

  deleteTravel(id: string) {
    return this.travelRef.doc(id).delete();
  }

  /**************Upload Files**************/

  async uploadFile(file: File):Promise<any> {
    const filePath = `${Date.now()}/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

      // uploadTask.snapshotChanges()
      //     .pipe(
      //       finalize( async() => {
      //         return await storageRef.getDownloadURL().subscribe(d => {
      //           console.log(d);
      //           return d
      //         })
      //         return await storageRef.getDownloadURL()
      //       })
      //     )
    
    const result = await uploadTask;
    return  (await uploadTask).ref.getDownloadURL()
  }



  /**************Role Methods**************/

  getAllRoles(): AngularFirestoreCollection<Role> {
    return this.rolesRef;
  }

}
