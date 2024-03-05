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
      })

      this.dataService.travels$.subscribe(items => {
        console.log("🚀 ~ TravelListComponent ~ ngOnInit ~ data:", items)
        this.data = items
      })
      
    }

  ngOnInit() {

    
    this.defineCustomerFilter()
    this.defineDateFilter()

    // this.authService.user$.subscribe(user => {
    //   this.user = user
    //   console.log("🚀 ~ TravelListComponent ~ ngOnInit ~ user:", user)
    // })

    this.travelState = [
      {state: 'submitted', icon: 'fa-regular fa-paper-plane'},
      {state: 'save', icon: 'fa-solid fa-floppy-disk'},
      {state: 'paid', icon: 'fa-solid fa-money-bill-wave'},
    ]
  }

  // auth() {
  //   const auth = getAuth();
  //   this.userAuth$ = auth.currentUser;
  // }

  defineCustomerFilter() {
    const customFilterName = 'custom-equals';

    this.filterService.register(customFilterName, (value: { name: string; } | null | undefined, filter: string | null | undefined): boolean => {
      //console.log("🚀 ~ TravelListComponent ~ this.filterService.register ~ value:", value)
      
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
  
      if(value === undefined || value === null) {
        return false;
      }

      return this.filterService.filters['contains'](value.name.toUpperCase(), filter.toUpperCase())
  
    })

    this.matchModeOptionsCustomer = [
      { label: "Custom Equals", value: customFilterName },
      //{ label: "Starts With", value: FilterMatchMode.STARTS_WITH },
      //{ label: "Contains", value: FilterMatchMode.CONTAINS }
    ];
  }

  defineDateFilter() {
    const customFilterName = 'date-equals';

    this.filterService.register(customFilterName, (value: { name: string; } | null | undefined, filter: string | null | undefined): boolean => {
      //console.log("🚀 ~ TravelListComponent ~ this.filterService.register ~ value:", value)
      
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
  
      if(value === undefined || value === null) {
        return false;
      }

      return this.filterService.filters['contains'](value.name.toUpperCase(), filter.toUpperCase())
  
    })

    this.matchModeOptionsDate = [
      { label: "Custom Equals", value: customFilterName },
      { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
      //{ label: "Contains", value: FilterMatchMode.CONTAINS }
    ];
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
      //console.log("🚀 ~ TravelListComponent ~ submitTravels ~ result:", result)
        // .subscribe(data => {
        //   console.log("🚀 ~ TravelListComponent ~ this.mailService.sendMail ~ data:", data)
          
        //   if(data == 'OK') {
        //     this.msgService.add({ severity: 'success', summary: 'Senden', detail: 'Reise(n) erfolgreich eingereicht' });
        //   } else {
        //     this.msgService.add({ severity: 'danger', summary: 'Error', detail: data.toString() });
        //   }
        // })

      this.selectedTravels = [];
    }
  }

  paidTravels() {
    this.selectedTravels.forEach(item => {
      console.log("🚀 ~ TravelListComponent ~ submitTravel ~ item:", item)
    })

    this.selectedTravels = [];
  }

  deleteTravel(travel: any) {
    console.log("🚀 ~ TravelListComponent ~ deleteTravel ~ travel:", travel)
  }












}



