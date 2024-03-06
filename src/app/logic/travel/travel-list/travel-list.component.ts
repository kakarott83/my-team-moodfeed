import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Travel } from '../../../model/travel';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { Table } from 'primeng/table';
import { FilterMatchMode, FilterService, MessageService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';
import { MailService } from '../../../services/shared/mail.service';
import { UserService } from '../../../services/shared/user.service';
import { Auth, User, getAuth } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { Firestore } from 'firebase/firestore';
import { FireService } from '../../../services/fire';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.scss',
  providers: [FilterService]
})
export class TravelListComponent implements OnInit {

  //@Input() data!: Travel[]
  @Input() isLoading!: boolean;
  @Output() changeTab = new EventEmitter<boolean>();
  cols!: any[];
  matchModeOptionsCustomer!: SelectItem[];
  matchModeOptionsDate!: SelectItem[];
  matchModeOptions!: SelectItem[];
  travelState: any[] = [];
  selectedTravels: Travel [] = [];
  user!: any
  userData!: any
  userAuth$!: any;
  myUser: any;
  data!: Travel[]
  

  constructor(
    public utiliesService: UtilitiesService, 
    private filterService: FilterService,
    private router: Router,
    private dataService: DataService,
    private mailService: MailService,
    private userService: UserService,
    private authService: AuthService,
    private msgService: MessageService,
    private fire: FireService
    ) {


      dataService.myUser$.subscribe(data => {
        this.myUser = data
        console.log("🚀 ~ TravelListComponent ~ myUser:", this.myUser)
        
      })

      this.dataService.travels$.subscribe(items => {
         console.log("🚀 ~ TravelListComponent ~ ngOnInit ~ data:", items)
         this.data = items
      })
      
    }

  ngOnInit() {

    const customerFilterName = 'custom-equals'

    this.filterService.register(customerFilterName, (value: any, filter: any): boolean => {
      console.log("🚀 ~ TravelListComponent ~ this.filterService.register ~ filter:", filter)
      console.log("🚀 ~ TravelListComponent ~ this.filterService.register ~ value:", value)
      
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if(value === undefined || value === null) {
        return false
      }

      return value.toString() === filter.toString()
    })

    this.cols = [
      { field: 'customer', header: 'Kunde' },
      { field: 'date', header: 'Start' },
      { field: 'date', header: 'Ende' },
      { field: 'reason', header: 'Grund' },
      { field: 'state', header: 'Status' },
    ]

    this.matchModeOptions = [
      { label: 'Custom Equals', value: customerFilterName },
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS }
  ];



    this.travelState = [
      {state: 'submitted', icon: 'fa-regular fa-paper-plane'},
      {state: 'save', icon: 'fa-solid fa-floppy-disk'},
      {state: 'paid', icon: 'fa-solid fa-money-bill-wave'},
    ]


  }



  clear(table: Table) {
    table.clear();
  }

  editTravel(travel: Travel) {
    console.log("🚀 ~ TravelListComponent ~ editTravel ~ travel:", travel)
    this.router.navigate(['/travel',travel.id])
    //this.dataService.selectedTravel.next(travel);
    this.changeTab.emit(true);
  }

  selectTravel(item: any) {
    this.dataService.selectedTravel.next(item);
    this.changeTab.emit(true);
  }

  async submitTravels() {

    //E-Mail an Server schicken
    if(this.myUser !== undefined) {
      let result = await this.mailService.sendMail(this.selectedTravels, this.myUser)

      this.selectedTravels = [];
    }
  }

  paidTravels() {
    this.selectedTravels.forEach(item => {
    })

    this.selectedTravels = [];
  }

  deleteTravel(travel: any) {
    console.log("🚀 ~ TravelListComponent ~ deleteTravel ~ travel:", travel)
  }














}



