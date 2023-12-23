import { Injectable } from '@angular/core';
import { Voting } from '../model/voting';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Question } from '../model/question';
import { Department } from '../model/department';
import { UserData } from '../model/user-data';


@Injectable({
  providedIn: 'root'
})

//https://www.bezkoder.com/angular-16-firestore-crud/

export class VotingService {
  private votingPath = '/votings'
  private questionPath = '/questions'
  private departmentPath = '/department'
  private userDataPath = '/userdata'

  votingRef!: AngularFirestoreCollection<Voting>;
  questionsRef!: AngularFirestoreCollection<Question>;
  departmentRef!: AngularFirestoreCollection<Department>;
  userDataRef!: AngularFirestoreCollection<UserData>;
  //userRef!: AngularFirestoreDocument<UserData>;

  constructor(private db: AngularFirestore) {
    this.votingRef = db.collection(this.votingPath);
    this.questionsRef = db.collection(this.questionPath);
    this.departmentRef = db.collection(this.departmentPath);
    this.userDataRef = db.collection(this.userDataPath);
    //this.userRef = db.doc(this.userDataPath);
  }

  /**************Voting Methods**************/
  getAllVotings(): AngularFirestoreCollection<Voting> {
    return this.votingRef;
  }

  createVoting(voting: Voting): any {
    return this.votingRef.add({...voting});
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
    return this.questionsRef.add({...question});
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
    return this.departmentRef.add({...department});
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

  /*getUserById(id: string): any {
    this.userDataRef.doc(id).snapshotChanges();
  }*/

  createUser(userData: UserData): any {
    return this.userDataRef.add({...userData});
  }

  updateUser(id: string, data: any) {
    return this.userDataRef.doc(id).update(data);
  }

  deleteUser(id: string) {
    return this.userDataRef.doc(id).delete();
  }

}
