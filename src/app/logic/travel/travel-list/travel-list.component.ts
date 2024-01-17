import { Component, Input, OnInit } from '@angular/core';
import { Travel } from '../../../model/travel';
import { UtilitiesService } from '../../../services/shared/utilities.service';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.scss',
  providers: [UtilitiesService, FilterService]
})
export class TravelListComponent implements OnInit {

  @Input() data!: Travel[]
  @Input() isLoading!: boolean;
  cols!: any[];
  matchModeOptions!: SelectItem[];

  constructor(private utiliesService: UtilitiesService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.customerFilterDefine();

  }

  customerFilterDefine() {
    const customerFilterName = 'custom-equals';
  
    this.filterService.register(customerFilterName, (value: any, filter: any): boolean => {
      if(filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }
  
      if(value === undefined || value === null) {
        return false;
      }
  
      return this.filterService.filters['contains'](value.name.toUpperCase(), filter.toUpperCase())
  
    })
  }

}



