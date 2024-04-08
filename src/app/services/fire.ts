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
import { Observable, filter, finalize, firstValueFrom, from, map, take, tap } from 'rxjs';
import { Reason } from '../model/reason';
import { Spendtype } from '../model/spendtype';
import { Spend } from '../model/spend';
import { SpendType } from '../model/spend-type';
import { Customer } from '../model/customer';
import { Country } from '../model/country';
import moment from 'moment';


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
  private reasonPath = '/reasons'
  private spendTypPath = '/spendtypes'
  private customerPath = '/customers'
  private countriesPath = '/countries'

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
  reasonRef!: AngularFirestoreCollection<Reason>;
  spendTypeRef!: AngularFirestoreCollection<Spendtype>
  customerRef!: AngularFirestoreCollection<Customer>
  countriesRef!: AngularFirestoreCollection<Country>
  //userRef!: AngularFirestoreDocument<UserData>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.votingRef = db.collection(this.votingPath);
    this.questionsRef = db.collection(this.questionPath);
    this.departmentRef = db.collection(this.departmentPath);
    this.userDataRef = db.collection(this.userDataPath);
    this.rolesRef = db.collection(this.rolesPath);
    this.worktimeRef = db.collection(this.worktimePath);
    this.travelRef = db.collection(this.travelPath);
    this.reasonRef = db.collection(this.reasonPath);
    this.spendTypeRef = db.collection(this.spendTypPath);
    this.countriesRef = db.collection(this.countriesPath);
    this.customerRef = db.collection(this.customerPath);
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

  getWorkTimeByUser(userId: string) {
      return firstValueFrom(

      this.db.collection<Worktime>('worktime', ref => ref.where('userId', '==', userId))
        .snapshotChanges()
          .pipe(
            map(actions => actions.map(x => 
              ({id: x.payload.doc.id, ...x.payload.doc.data()})
            ).sort((a, b) => {
              const aDate = a.date ?? new Date()
              const bDate = b.date ?? new Date()
              return (aDate < bDate) ? -1 : (aDate > bDate) ? 1 : 0
            })
            ),
            //tap(x => console.log(x,'WT'))
          )
        )
  }

  getWorkTimeHours(userId: string, startDate: Date, endDate: Date) {
    let workTimeDuration: any[] = [0,0,0,0,0];
    return firstValueFrom(
      this.db.collection<Worktime>('worktime', ref => ref.where('userId', '==', userId))
        .snapshotChanges()
          .pipe(
            map(actions => actions.map(x => 
              ({id: x.payload.doc.id, ...x.payload.doc.data()})
            )),
            map(wts => {
              let filteredWts = wts.filter(
                wt => new Date(wt.date == undefined ? 0 : new Date(wt.date)) >= startDate
              )

              filteredWts.forEach(x => {
                let index = new Date(x.date!).getDay()-1
                workTimeDuration[index] = this.calcDuration(x.start!, x.end!, x.break!)
              })

              return workTimeDuration
            })
          )
        )
  }

  private calcDuration(start: string, end: string, breakTime: string) {
    let startDate = new Date()
    let startSplit = start.split(':')
    startDate.setHours(+startSplit[0])
    startDate.setMinutes(+startSplit[1])
    startDate.setSeconds(0)

    let endDate = new Date()
    let endSplit = end.split(':')
    endDate.setHours(+endSplit[0])
    endDate.setMinutes(+endSplit[1])
    endDate.setSeconds(0)

    let result = endDate.getTime() - startDate.getTime()

    if(breakTime) {
      let breakSplit = breakTime.split(':')
      result = result - parseInt(breakSplit[0]) + (parseInt(breakSplit[1]) / 60)
    }

    return result / (1000 * 60 * 60)
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

  /**************Travel**************/

  getAllTravels(): AngularFirestoreCollection<Travel> {
    return this.travelRef;
  }


  getTravelByUserId(id: string): AngularFirestoreCollection<Travel> {
    let data = this.db.collection<Travel>('travels', ref => {
      return ref.where('userId', '==', id)
    })
    return data;
  }

  getTravelByUser(id: string) {

    return firstValueFrom(
      this.db.collection<Travel>('travels', ref => {
        return ref.where('userId', '==', id)
      }).snapshotChanges()
      .pipe(
        map(actions => actions.map(x =>(
          {id: x.payload.doc.id, ...x.payload.doc.data()}
        )),
    )))
  }

  getTravelByUser2(id: string) {
      return this.db.collection<Travel>('travels', ref => {
        return ref.where('userId', '==', id)
        })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(x =>(
          {id: x.payload.doc.id, ...x.payload.doc.data()}
        )),
        ))
  }

  getTravelLastXByUser(id: string, number: number) {
    return firstValueFrom(
      this.db.collection<Travel>('travels', ref => {
        return ref.where('userId', '==', id)
      }).snapshotChanges()
      .pipe(
        map(actions => actions.map(x =>(
          {id: x.payload.doc.id, ...x.payload.doc.data()}
        )).sort((a, b) => {
          const aDate = a.date ?? []
          const bDate = b.date ?? []
          return (aDate[0] < bDate[0]) ? -1 : (aDate[0] > bDate[0]) ? 1 : 0
        }).slice(0,number)
    )))
  }



  getTravelById(id: string) {
    return this.db.collection<Travel>('travels').doc(id).snapshotChanges()
      .pipe(
        map(x => ({
          id: x.payload.id,
          ...x.payload.data()
        })),
      )
  }

  getTravelByIdPromise(id: string) {
    return firstValueFrom(
      this.db.collection<Travel>('travels').doc(id).snapshotChanges()
      .pipe(
        map(x => ({
          id: x.payload.id,
          ...x.payload.data()
        })),
      )
    )
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
    console.log(result,'Result');
    const d = {
      url: await result.ref.getDownloadURL(),
      name: result.ref.name,
      key: result.metadata.generation,
      //ref: result.ref
    }
    console.log("🚀 ~ FireService ~ uploadFile ~ d:", d)
    //return  (await uploadTask).ref.getDownloadURL()
    return d;

  }



  /**************Role Methods**************/

  getAllRoles(): AngularFirestoreCollection<Role> {
    return this.rolesRef;
  }

  /**************Reason Methods**************/

  getAllReason(): Observable<any> {
    return this.reasonRef.snapshotChanges().pipe(
      map(changes => changes.map(c => 
        (
          {id: c.payload.doc.id, ...c.payload.doc.data()}
        )
      ))
    );
  }

  getAllReasonsPromise() {
    return firstValueFrom(
      this.reasonRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      )
    )
  }

  getReasonById(id: string) {
    return firstValueFrom(
      this.reasonRef.doc(id).valueChanges()
    )
  }


  createReason(reason: Reason): Promise<Reason> {
    return this.reasonRef.add({ ...reason });
  }

  updateReason(id: string, data: any) {
    return this.reasonRef.doc(id).update(data);
  }

  deleteReason(id: string) {
    return this.reasonRef.doc(id).delete();
  }


  /**************SpendType Methods**************/

  getAllSpendType(): Observable<any> {
    return this.spendTypeRef.snapshotChanges()
      .pipe(
        map(changes => 
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      );
  }

  getAllSpendTypsPromise() {
    return firstValueFrom(
      this.spendTypeRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      )
    )
  }

  createSpendType(spendType: SpendType): Promise<SpendType> {
    return this.spendTypeRef.add({ ...spendType });
  }

  updateSpendType(id: string, data: any) {
    return this.spendTypeRef.doc(id).update(data);
  }

  deleteSpendType(id: string) {
    return this.spendTypeRef.doc(id).delete();
  }

  /**************SpendType Methods**************/

  getAllCustomer(): Observable<any> {
    return this.customerRef.snapshotChanges()
      .pipe(
        map(changes => 
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      );
  }

  getAllCustomersPromise() {
    return firstValueFrom(
      this.customerRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      )
    )
  }

  createCustomer(customer: Customer): Promise<Customer> {
    return this.customerRef.add({ ...customer });
  }

  updateCustomer(id: string, data: any) {
    return this.customerRef.doc(id).update(data);
  }

  deleteCustomer(id: string) {
    return this.customerRef.doc(id).delete();
  }


  /**************Country Methods**************/

  getAllCountries(): Observable<any> {
    return this.countriesRef.snapshotChanges()
      .pipe(
        map(changes => 
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      );
  }

  getAllCountriesPromise() {
    return firstValueFrom(
      this.countriesRef.snapshotChanges()
      .pipe(
        map(changes => 
          changes.map(c => (
            {id: c.payload.doc.id, ...c.payload.doc.data()}
          )))
      )
    )
  }

  createCountry(country: Country): Promise<Country> {
    return this.countriesRef.add({ ...country });
  }

  updateCountry(id: string, data: any) {
    return this.countriesRef.doc(id).update(data);
  }

  deleteCountry(id: string) {
    return this.countriesRef.doc(id).delete();
  }


}
