import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Travel } from '../../model/travel';
import { UserService } from '../../services/shared/user.service';
import { MessageService } from 'primeng/api';
import { UtilitiesService } from '../../services/shared/utilities.service';
import { Customer } from '../../model/customer';
import { Spend } from '../../model/spend';
import { Spendtype } from '../../model/spendtype';
import { Upload } from '../../model/upload';
import { FireService } from '../../services/fire';
import { FileUpload } from 'primeng/fileupload';
import { error } from 'console';
import { Observable, finalize, map, min, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
  providers:[UserService,MessageService, UtilitiesService]
})
export class TravelComponent implements OnInit {

  myTravelForm!: FormGroup;
  myTravel: Travel = {};
  myTravel$!: Observable<Travel>
  myUser: any;
  date!: Date;
  dateRange: Date[] = []
  customers: Customer[] = []
  reasons: string[] = []
  spends: Spend[] = []
  spendTyps: string[] = []
  spendtyp = ''
  value = 0
  spendComment = ''
  spendDate = new Date();
  spendsItems = new FormArray([]);
  spendArray!: FormArray;
  uploadedFiles: any[] = [];
  currentFileUpload?: FileUpload;
  storeFile: any[] = [];
  isLoading = false;
  myTravelList: Travel[] = [];
  maxDate = new Date('20240101')
  minDate = new Date('20991231')



  constructor(
    private fire: FireService, 
    private fb: FormBuilder, 
    private userService: UserService, 
    private msgService: MessageService, 
    private utilityService: UtilitiesService,
    private route: ActivatedRoute) {

    this.spendArray = fb.array([]);

  }

  
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')!;
    console.log("🚀 ~ TravelComponent ~ ngOnInit ~ id:", id)

    this.fire.getTravelById(id).subscribe(data => console.log(data))
    
    

    this.dateRange = this.utilityService.createDateArray();
    this.customers = this.createCustomer();
    this.reasons = this.createReason();
    this.spendTyps = this.createSpendTypes();

    this.myUser = this.userService.getUser();
    this.myTravelForm = this.fb.group({
      dateRange: new FormControl(this.dateRange),
      customer:  new FormControl(),
      reason:  new FormControl(),
      comment: new FormControl(),
      spends: this.spendArray
    })

    this.getTravels(this.myUser.uid);

    this.myTravelForm.controls['dateRange'].valueChanges.subscribe(value => {
      /*MinDate im Spend setzen*/
      if(value[0] !== null) {
        this.minDate = value[0]
      }
      /*MaxDate im Spend setzen*/
      if(value[1] !== null) {
        this.maxDate = value[1]
      }
    })
  }

  async submit() {
    let travel = this.createTravel()
    const uploadResult = await this.uploadFiles()

    if(uploadResult) {
        travel.fileRefs = uploadResult;
    }

    if(travel) {
      this.fire.createTravel(travel)
        .then(() => {
          this.msgService.add({ severity: 'success', summary: 'Arbeitszeit', detail: 'Arbeitszeit gespeichert'});
        })
        .then(() => {
          this.clearForm()
        })
    }    
  }

  createTravel(): Travel {
    this.myTravel = {
      date: this.myTravelForm.controls['dateRange'].value,
      customer: this.myTravelForm.controls['customer'].value,
      reason: this.myTravelForm.controls['reason'].value,
      comment: this.myTravelForm.controls['comment'].value,
      userId: this.myUser.uid,
      state: 'save'
    }

    /*Spends add*/
    for (let index = 0; index < this.spendArray.controls.length; index++) {
      const element = this.spendArray.at(index) as FormGroup;
      let spendItem: Spend = {
        date: element.controls['date'].value,
        value: element.controls['value'].value,
        type: element.controls['type'].value
      }
      this.spends.push(spendItem);
    }

    this.myTravel.spends = this.spends

    return this.myTravel
  }

  async uploadFiles() {
    this.uploadedFiles.forEach(x => {
      this.storeFile.push(this.uploadToStorage(x))
    })
    return await Promise.all(this.storeFile)
  }

  uploadToStorage(file: File): Promise<any> {
    return this.fire.uploadFile(file)
  }

  addSpend() {
    let spendDate = this.myTravelForm.controls['dateRange'].value[0]
    this.spendArray.push(
      this.fb.group({
        type: 'Auto',
        value: 0,
        date: spendDate !== null ? spendDate : null,
      })
    )
  }

  deleteSpend(i: any) {
    this.spendArray.removeAt(i);
  }

  onBasicUploadAuto(event: any) {
    console.log('Hallo')
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.msgService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  deleteFile(index: number) {
    this.uploadedFiles.splice(index,1)
  }

  getItems() {
    return (this.myTravelForm.controls['spends'] as FormArray).controls
  }


  createCustomer(): Customer[] {
    let customers: Customer[] = [
      {name: 'AIL', country: {name: 'Deutschland', code: 'DE', rate: 24, halfRate: 12}},
      {name: 'Oberbank', country: {name: 'Österreich', code: 'AT', rate: 36, halfRate: 20}}
    ];

    return customers
  }

  createReason(): string[] {
    return ['Vor Ort Betreuung', 'Livegang', 'Workshop']
  }

  createSpendTypes(): string[] {
    let spendType = ['Bahn/Bus','Auto'];

    return spendType
  }

  getTravels(userId: string) {
    if(userId) {
      this.isLoading = true;
      this.fire.getTravelByUserId(userId).snapshotChanges()
        .pipe(
          map(changes => changes.map(x => 
            ({id: x.payload.doc.id, ...x.payload.doc.data()})
            )),
        )
        .subscribe(data => {
          this.myTravelList = data
          this.isLoading = false;
          console.log(this.myTravelList,'MyTravelList')
        })
    } else {
    }
  }

  clearForm() {
    /*Form leeren*/
    if(this.myTravelForm) {
      this.myTravelForm.reset();
    }
    /*Spends leeren*/
    if(this.spendArray.length > 0) {
      this.spendArray.clear()
    }
    if(this.uploadedFiles.length > 0) {
      this.uploadedFiles = [];
    }
  }

}
