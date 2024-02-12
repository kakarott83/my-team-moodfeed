import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Travel } from '../../../model/travel';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { Table } from 'primeng/table';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DataService } from '../../../services/shared/data.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.scss',
  providers: [UtilitiesService, FilterService]
})
export class TravelListComponent implements OnInit {

  @Input() data!: Travel[]
  @Input() isLoading!: boolean;
  @Output() changeTab = new EventEmitter<boolean>();
  cols!: any[];
  matchModeOptionsCustomer!: SelectItem[];
  matchModeOptionsDate!: SelectItem[];
  travelState: any[] = [];
  

  constructor(
    public utiliesService: UtilitiesService, 
    private filterService: FilterService, 
    private router: Router,
    private dataService: DataService) {}

  ngOnInit(): void {
    this.defineCustomerFilter()
    this.defineDateFilter()

    

    this.travelState = [
      {state: 'submitted', icon: 'fa-regular fa-paper-plane'},
      {state: 'save', icon: 'fa-solid fa-floppy-disk'},
      {state: 'paid', icon: 'fa-solid fa-money-bill-wave'},
    ]
  }

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












}



