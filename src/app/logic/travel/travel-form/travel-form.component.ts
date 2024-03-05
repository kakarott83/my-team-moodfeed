import { Component, ComponentFactoryResolver, ElementRef, HostListener, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Travel } from '../../../model/travel';
import { Spend } from '../../../model/spend';
import { MessageService } from 'primeng/api';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { UserService } from '../../../services/shared/user.service';
import { Customer } from '../../../model/customer';
import { FireService } from '../../../services/fire';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';
import { STATE } from '../../../enums';
import { Reason } from '../../../model/reason';
import { SpendType } from '../../../model/spend-type';
import { MailService } from '../../../services/shared/mail.service';
import { CurrencyDialogComponent } from '../../dialogs/currency-dialog/currency-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import moment from 'moment';
import { TravelDays } from '../../../model/travelDays';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrl: './travel-form.component.scss',
  providers:[UserService,MessageService, UtilitiesService, DialogService],
})
export class TravelFormComponent implements OnInit {


  myTravelForm!: FormGroup;
  spendArray!: FormArray;
  //daysArray!: FormArray;
  dateRange: Date[] = [];
  maxDate = new Date('20240101');
  minDate = new Date('20991231');
  myTravel!: Travel;
  spends: Spend[] = [];
  days!: any[];
  days$: Observable<TravelDays[]>;
  uploadedFiles: any[] = [];
  storeFile: any[] = [];
  customers: Customer[] = [];
  reasons: Reason[] = [];
  spendTyps: SpendType[] = [];
  isLoading = false;
  spendComment = '';
  isDisabled = false;
  filesFromDbList: any = [];
  duration = '';
  sumRate = 0;
  sumSpend = 0;
  sumTotal = 0;
  myUser: any;
  dialogRef: DynamicDialogRef | undefined
  
  //@Input() myUser: any;
  //https://www.amz-steuer.de/reisekostenrechner/

  constructor(
    private fire: FireService, 
    private fb: FormBuilder,
    private msgService: MessageService,
    private utilityService: UtilitiesService,
    private userService: UserService,
    private route: ActivatedRoute,
    public dataService: DataService,
    private mailService: MailService,
    private el: ElementRef,
    public dialogService: DialogService
    ) {

      this.days$ = this.dataService.travelsDay$.pipe(
        tap(x => this.days = x)
      )

      this.days$.subscribe(data => {
        this.setAmountRate(data)
      })
      
    }


  ngOnInit(): void {

   
    console.log(this.days, 'Init')

    this.dataService.selectedTravel.subscribe(data => {
      this.createForm(data)
    })
      
  }

  async createForm(item?: Travel) {
    console.log("🚀 ~ TravelFormComponent ~ createForm ~ item:", item)

    this.isLoading = true

    this.customers = await this.fire.getAllCustomersPromise();
    this.reasons = await this.fire.getAllReasonsPromise();
    this.spendTyps = await this.fire.getAllSpendTypsPromise();
    this.dateRange = this.utilityService.createDateArray();
    this.myUser = await this.userService.getAllUserData()
    this.spendArray = this.fb.array([]);
    //this.daysArray = this.fb.array([]);

    //Load Or Create Travel
    if(item !== undefined) {

      if(item.state !== STATE[0]) {
        this.isDisabled = true
      }

      console.log("🚀 ~ TravelFormComponent ~ createForm ~ item2:", item)
      this.clearForm()
      this.spendArray.clear()
      //this.daysArray.clear()

      this.myTravel = item;


      /*SET Start End*/
      let dr: Date[] = [];
      if(item.date !== undefined && item.date !== null) {
        dr.push(new Date(Object(item.date[0])['seconds']*1000))
        dr.push(new Date(Object(item.date[1])['seconds']*1000))
        this.duration = this.utilityService.calcDuration(dr[0],dr[1])
      }


      this.myTravelForm = this.fb.group({
        dateRange: new FormControl(dr),
        customer: new FormControl(item.customer),
        reason: new FormControl(item.reason),
        comment: new FormControl(item.comment),
        breakfast: new FormControl(item.breakfast),
        launch: new FormControl(item.launch),
        dinner: new FormControl(item.dinner),
        spends: this.spendArray,
        //days: this.daysArray
      })

      item.spends?.forEach(i =>  {
        if(i.date !== undefined && i.date !== null) {
          this.spendArray.push(
            this.fb.group({
              type: i.type,
              value: i.value,
              date: new Date(Object(i.date)['seconds']*1000),
              comment: i.comment
            })
          )
        }
      })

      if(item.days !== undefined) {
        let dArr:TravelDays[] = []
        item.days.map(x => {
          let timeStamp = Object(x.date)       

          dArr.push({
            amount: x.amount,
            fullAmount: x.fullAmount,
            totalAmount: x.totalAmount,
            breakfast: x.breakfast,
            launch: x.launch,
            dinner: x.dinner,
            date: x.date !== undefined ? new Date(timeStamp.seconds*1000)  : new Date()
          })

          console.log(dArr,'dArr')
          console.log(this.days,'this.days')
        })
        
        this.dataService.travelsDay$.next(dArr);



        //this.days$ = this.days as Observable<TravelDays>
      }
      

      /*SET Documents End*/
      item.fileRefs?.forEach(i => {
        if(i !== undefined && i !== null) {
          this.filesFromDbList.push(i)
        }
      })

      if(this.isDisabled) {
        //Submitted, Paid
        this.myTravelForm.disable()
        this.setSpendDisable()
      }

      //this.changeTravel(item)


      
    } else {

      //Create New Form
      this.myTravelForm = this.fb.group({
        dateRange: new FormControl('', Validators.required),
        customer:  new FormControl('', Validators.required),
        reason:  new FormControl(),
        comment: new FormControl(),
        breakfast: new FormControl(true),
        launch: new FormControl(false),
        dinner: new FormControl(false),
        spends: this.spendArray,
        //days: this.daysArray
      })
    }

    this.myTravelForm.valueChanges.subscribe(data => {
      this.changeTravel(data)
    })

    this.myTravelForm.get('dateRange')?.valueChanges.subscribe(() => {
      console.log('dateRange')
      if(!this.isLoading) {
        this.utilityService.createDays(this.myTravelForm)
      }
      
    })

    this.myTravelForm.get('customer')?.valueChanges.subscribe(() => {
      console.log('customer')
      if(!this.isLoading) {
        this.utilityService.createDays(this.myTravelForm)
      }
    })
    

    this.isLoading = false;
  }

  createTravel(): Travel {
    console.log(this.myUser)
    this.myTravel = {
      date: this.myTravelForm.controls['dateRange'].value,
      customer: this.myTravelForm.controls['customer'].value,
      reason: this.myTravelForm.controls['reason'].value,
      breakfast: this.myTravelForm.controls['breakfast'].value,
      launch: this.myTravelForm.controls['launch'].value,
      dinner: this.myTravelForm.controls['dinner'].value,
      comment: this.myTravelForm.controls['comment'].value,
      userId: this.myUser == null ? '' :  this.myUser.uid,
      amount: this.sumTotal,
      days: this.dataService.travelsDay$.value
    }

    /*Spends add*/
    this.spends = []
    for (let index = 0; index < this.spendArray.controls.length; index++) {
      const element = this.spendArray.at(index) as FormGroup;
      let spendItem: Spend = {
        date: element.controls['date'].value,
        value: element.controls['value'].value,
        type: element.controls['type'].value,
        comment: element.controls['comment'].value
      }
      this.spends.push(spendItem);
    }

    this.myTravel.spends = this.spends

    return this.myTravel
  }

  changeTravelDay(list: any) {
    this.setAmountRate(list)
  }

  changeTravel(travel: any) {
    this.createTravel()
    this.sumSpend = 0
    this.sumTotal = 0
    console.log("🚀 ~ TravelFormComponent ~ changeTravel ~ travel1:", this.days)

    if(this.myTravel.date !== undefined) {
      this.duration = this.utilityService.calcDuration(this.myTravel.date[0],this.myTravel.date[1])
    }

    if(this.myTravel.date !== undefined && travel.customer !== null && travel.customer !== '') {
      console.log(travel.customer,'Days')

      //this.sumRate = this.utilityService.calcRate(this.myTravel);
      this.days.forEach(x => {
        console.log(x,'X')
      })

      if(this.myTravel.spends !== undefined) {
        let arr: Spend[] = this.myTravel.spends
  
        arr.forEach(item => {
          this.sumSpend += item.value !== undefined ? item.value : 0 
        })
      }

      this.sumTotal = this.sumRate  + this.sumSpend


    }
  }

  async submit(action: string) {
    let travel = this.createTravel()

    if(travel.state == undefined) {
      switch (action) {
        case 'save':
          travel.state = STATE[0];
          break;
        case 'send':
          travel.state = STATE[1];
          break;
      }
    }
    
    const uploadResult = await this.uploadFiles()

    if(uploadResult) {
        travel.fileRefs = uploadResult;
    }

    if(travel) {
      console.log("🚀 ~ TravelFormComponent ~ submit ~ travel:", travel)
      
      this.fire.createTravel(travel)
        .then(() => {
          this.msgService.add({ severity: 'success', summary: 'Reisekosten', detail: 'Reisekosten gespeichert'});
        })
        .then(() => {
          this.clearForm()
        })
    }
    
    if(action == 'send') {
      let travels: Travel[] = [];
      travels.push(this.myTravel)
      this.mailService.sendMail(travels, this.myUser)
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
        comment: ''
      })
    )
    console.log(this.spendArray,'SpendArray')
  }

  getSpendById(id: number) {
    return this.spendArray.at(id);
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

  getDay() {
    return (this.myTravelForm.controls['days'] as FormArray).controls
  }

  setSpendDisable() {
    (this.myTravelForm.controls['spends'] as FormArray).controls.forEach(control => {
      console.log(control,'Control')
      control.disable()
    })
  }

  showDialog(item: any) {
    console.log(this.getSpendById(item),'Item');
    let sArra = this.getSpendById(item).value

    console.log(sArra.value)
    console.log(sArra.date)

    this.dialogRef = this.dialogService.open(CurrencyDialogComponent, {
      data: {
        index: item,
        value: sArra.value == 0 ? 1 : sArra.value,
        date: sArra.date
      },
      modal: true,
      header: 'Währungsrechner',
      width: '30vw',
      height: '60vh'
    })

    this.dialogRef.onClose.subscribe(data => {
      if(data) {
        console.log(data,'DialogData2')
        let mySpendItem = this.getSpendById(data.itemId);
        console.log("🚀 ~ TravelFormComponent ~ showDialog ~ mySpendItem:", mySpendItem)
        mySpendItem.patchValue({
          date: data.date,
          value: data.value
        })
        
      }
      

    })
  }

  createSpendTypes(): string[] {
    let spendType = ['Bahn/Bus','Auto'];

    return spendType
  }

  setAmountRate(days: any) {
    let arr = []
    arr = days
    this.sumRate = 0
    arr.forEach((day: TravelDays) => {
      this.sumRate += day.totalAmount !== undefined ? day.totalAmount : 0
    })
  }

  clearForm() {
    /*Form leeren*/
    if(this.myTravelForm) {
      this.myTravelForm.reset();
      this.duration = ''
      this.sumRate = 0
      this.sumSpend = 0
      this.sumTotal = 0
    }

    if(this.myTravel) {
      this.myTravel = {date: []}
    }

    /*Spends leeren*/
    if(this.spendArray.length > 0) {
      this.spendArray.clear()
    }

    console.log("🚀 ~ TravelFormComponent ~ clearForm ~ uploadedFiles:", this.uploadedFiles)
    if(this.uploadedFiles.length > 0) {
      this.uploadedFiles = [];
    }

    if(this.myTravel.days) {
      this.dataService.travelsDay$.next([]);
    }

    if(this.days$) {
      this.dataService.travelsDay$.next([]);
    }
  }








}
