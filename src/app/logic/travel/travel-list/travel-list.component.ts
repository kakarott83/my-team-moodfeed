import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Travel } from '../../../model/travel';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { Table } from 'primeng/table';
import {
  ConfirmationService,
  FilterMatchMode,
  FilterService,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';
import { MailService } from '../../../services/shared/mail.service';
import { UserService } from '../../../services/shared/user.service';
import { Auth, User, getAuth } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { Firestore } from 'firebase/firestore';
import { FireService } from '../../../services/fire';
import { DatePipe } from '@angular/common';
import { state } from '@angular/animations';
import { STATE } from '../../../enums';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.scss',
  providers: [FilterService],
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
  selectedTravels: any[] = [];
  user!: any;
  userData!: any;
  userAuth$!: any;
  myUser: any;
  data: Travel[] = [];
  flatData: any[] = [];

  constructor(
    public utiliesService: UtilitiesService,
    private filterService: FilterService,
    private router: Router,
    private dataService: DataService,
    private mailService: MailService,
    private userService: UserService,
    private authService: AuthService,
    private msgService: MessageService,
    private fire: FireService,
    private datePipe: DatePipe,
    private customConfirmationService: ConfirmationService
  ) {
    dataService.myUser$.subscribe((data) => {
      this.myUser = data;
      console.log('🚀 ~ TravelListComponent ~ myUser:', this.myUser);
    });

    this.dataService.travels$.subscribe((items) => {
      console.log('🚀 ~ TravelListComponent ~ ngOnInit ~ data:', items);
      this.data = items
      this.convertFlatTable(items);
    });
  }

  ngOnInit() {
    const customerFilterName = 'custom-equals';

    this.filterService.register(
      customerFilterName,
      (value: any, filter: any): boolean => {
        console.log(
          '🚀 ~ TravelListComponent ~ this.filterService.register ~ filter:',
          filter
        );
        console.log(
          '🚀 ~ TravelListComponent ~ this.filterService.register ~ value:',
          value
        );

        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      }
    );

    this.cols = [
      { field: 'customer', header: 'Kunde' },
      { field: 'start', header: 'Start' },
      { field: 'end', header: 'Ende' },
      { field: 'reason', header: 'Grund' },
      { field: 'state', header: 'Status' },
      { field: 'id', header: 'Id' },
    ];

    this.matchModeOptions = [
      { label: 'Custom Equals', value: customerFilterName },
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS },
    ];

    this.travelState = [
      { state: 'submitted', icon: 'fa-regular fa-paper-plane' },
      { state: 'save', icon: 'fa-solid fa-floppy-disk' },
      { state: 'paid', icon: 'fa-solid fa-money-bill-wave' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  editTravel(travel: Travel) {
    console.log('🚀 ~ TravelListComponent ~ editTravel ~ travel:', travel);
    this.router.navigate(['/travel', travel.id]);
    //this.dataService.selectedTravel.next(travel);
    this.changeTab.emit(true);
  }

  selectTravel(item: any) {

    this.dataService.selectedTravel.next(item);
    this.changeTab.emit(true);

  }

  async submitTravels() {
    //E-Mail an Server schicken
    if (this.myUser !== undefined) {
      let result = await this.mailService.sendMail(
        this.selectedTravels,
        this.myUser
      );

      this.selectedTravels = [];
    }
  }

  paidTravels() {

    let mySelectedTravelList: Travel[] = [];

    this.selectedTravels.forEach((item) => {
      let t = this.getTravelFromList(item.id)
      
      if(t) {
        mySelectedTravelList.push(t)
      }

    });

    mySelectedTravelList.forEach(travel => {
      let updatedTravel = travel
      updatedTravel.state = STATE[2]
      if(updatedTravel.id) {
        this.fire.updateTravel(updatedTravel.id, updatedTravel)
      }
      
    })
    this.selectedTravels = [];
  }

  deleteTravel(travel: any) {
    console.log('🚀 ~ TravelListComponent ~ deleteTravel ~ travel:', travel);
    this.customConfirmationService.confirm({
      message: 'Willst du diese Reise wirklich löschen?',
      accept: () => {
        if(travel.id) {
          this.fire.deleteTravel(travel.id).then(() => {
            this.msgService.add({ severity: 'info', summary: 'Reise', detail: 'Reise wurde gelöscht' });
          })
        }
      },
      reject: () => {
        console.log('Rejected');
      }
    })
  }

  onConfirmed() {
    // Logic when confirmed in custom dialog
    console.log('Confirmed in Custom Dialog');
  }

  onRejected() {
    // Logic when rejected in custom dialog
    console.log('Rejected in Custom Dialog');
  }



  convertFlatTable(data: Travel[]) {
    console.log('🚀 ~ TravelListComponent ~ convertFlatTable ~ data:', data);
    this.flatData = [];

    data.forEach((x) => {
      this.flatData.push({
        customer: x.customer?.name,
        start: this.datePipe.transform(x.date[0].toDate(), 'dd.MM.yyyy HH:mm'),
        end: this.datePipe.transform(x.date[1].toDate(), 'dd.MM.yyyy HH:mm'),
        reason: x.reason?.name,
        state: x.state,
        id: x.id
      });
    });
  }

  getTravelFromList(id: string) {
    let t = this.data.find((x: Travel) => x.id === id)
    return t
  }

}

