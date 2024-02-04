import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Travel } from '../../../model/travel';
import { Spend } from '../../../model/spend';
import { MessageService } from 'primeng/api';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { UserService } from '../../../services/shared/user.service';
import { Customer } from '../../../model/customer';
import { FireService } from '../../../services/fire';
import { BehaviorSubject, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';
import { parse } from 'path';
import { STATE } from '../../../enums';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrl: './travel-form.component.scss',
  providers:[UserService,MessageService, UtilitiesService, DataService]
})
export class TravelFormComponent implements OnInit {


  myTravelForm!: FormGroup;
  spendArray!: FormArray;
  dateRange: Date[] = [];
  maxDate = new Date('20240101');
  minDate = new Date('20991231');
  myTravel: Travel = {};
  spends: Spend[] = [];
  uploadedFiles: any[] = [];
  storeFile: any[] = [];
  customers: Customer[] = [];
  reasons: string[] = [];
  spendTyps: string[] = [];
  isLoading = false;
  spendComment = '';
  isDisabled = false
  filesFromDbList: any = []
  
  @Input() myUser: any;

  constructor(
    private fire: FireService, 
    private fb: FormBuilder,
    private msgService: MessageService,
    private utilityService: UtilitiesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dataService: DataService
    ) {
      this.spendArray = fb.array([]);

      this.route.params.subscribe(params => {
        console.log("🚀 ~ TravelFormComponent ~ params:", params['id'])
        const id = params['id'];

        if(id !== undefined) {
          this.createTravelFormById(id);
        }
      })
      
      

    //this.fire.getTravelById(id).subscribe(data => console.log(data))
    }


  ngOnInit(): void {
    this.dateRange = this.utilityService.createDateArray();
    this.customers = this.createCustomer();
    this.reasons = this.createReason();
    this.spendTyps = this.createSpendTypes();

    this.myUser = this.userService.getUser();

    /*Doesnt Work*/
    this.dataService.selectedTravel.subscribe({
      next: (t) => console.log(t)
    })


    this.createTravelForm();

    this.myTravelForm.controls['dateRange'].valueChanges.subscribe(value => {
      /*MinDate und Max setzen*/

      if(value !== null) {
        this.minDate = value[0]
        this.maxDate = value[1]
      }
    })

    


  }

  createTravelForm() {
    this.myTravelForm = this.fb.group({
      dateRange: new FormControl(this.dateRange),
      customer:  new FormControl(),
      reason:  new FormControl(),
      comment: new FormControl(),
      spends: this.spendArray
    })
  }

  createTravelFormById(id: string) {
    this.clearForm()
    this.spendArray.clear()
    this.fire.getTravelById(id).subscribe(data => {

      const state = data.state

      if(data.state !== STATE[0]) {
        this.isDisabled = true
      }

      /*SET Start End*/
      let dr: Date[] = [];
      if(data.date !== undefined && data.date !== null) {
        dr.push(new Date(Object(data.date[0])['seconds']*1000))
        dr.push(new Date(Object(data.date[1])['seconds']*1000))
      }
      
      /*SET other Values*/
      this.myTravelForm.patchValue({
        dateRange: dr,
        customer: data.customer,
        reason: data.reason,
        comment: data.comment,
      })

      /*SET Spends End*/
      data.spends?.forEach(item =>  {
        if(item.date !== undefined && item.date !== null) {
          this.spendArray.push(
            this.fb.group({
              type: item.type,
              value: item.value,
              date: new Date(Object(item.date)['seconds']*1000),
            })
          )
        }
      })
      /*SET Documents End*/
      data.fileRefs?.forEach(item => {
        if(item !== undefined && item !== null) {
          this.filesFromDbList.push(item)
        }
      })

      if(this.isDisabled) {
        //Submitted, Paid
        this.myTravelForm.disable()
        this.setSpendDisable()
      }


    })
  }

  createTravel(): Travel {
    this.myTravel = {
      date: this.myTravelForm.controls['dateRange'].value,
      customer: this.myTravelForm.controls['customer'].value,
      reason: this.myTravelForm.controls['reason'].value,
      comment: this.myTravelForm.controls['comment'].value,
      userId: this.myUser.uid,
      state: STATE[0]
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
    console.log(this.spendArray,'SpendArray')
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

  setSpendDisable() {
    (this.myTravelForm.controls['spends'] as FormArray).controls.forEach(control => {
      console.log(control,'Control')
      control.disable()
    })
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