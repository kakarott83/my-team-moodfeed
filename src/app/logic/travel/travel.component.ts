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

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
  providers:[UserService,MessageService, UtilitiesService]
})
export class TravelComponent implements OnInit {

  myTravelForm!: FormGroup;
  myTravel: Travel = {};
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


  constructor(private fb: FormBuilder, private userService: UserService, private msgService: MessageService, private utilityService: UtilitiesService) {
    this.spendArray = fb.array([]);
  }

  
  ngOnInit(): void {

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
  }

  submit() {
    this.myTravel = {
      date: this.myTravelForm.controls['date'].value,
      customer: this.myTravelForm.controls['customer'].value,
      reason: this.myTravelForm.controls['reason'].value
    }

    console.log(this.myTravel,'MyTravel')
  }

  addSpend() {
    this.spendArray.push(
      this.fb.group({
        type: '',
        value: 0,
        date: new Date(),
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

    console.log(this.uploadedFiles)

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

  createSpend() {}

  createSpendTypes(): string[] {
    let spendType = ['Bahn/Bus','Auto'];

    return spendType
  }

}
