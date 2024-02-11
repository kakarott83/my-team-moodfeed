import { Component, OnInit } from '@angular/core';
import { Country } from '../../../model/country';
import { FireService } from '../../../services/fire';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent implements OnInit {

  countryList!: Country[];

  constructor(private fire: FireService, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.createCountryList()
  }

  createCountryList() {
    this.fire.getAllCountries().subscribe(data => {
      this.countryList = data
    } )
  }

  selectCountry(item: any) {
    this.dataService.selectedCountry.next(item);
  }

  deleteCountry(id: string) {

    this.fire.deleteCountry(id)
    .then(() => { 
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gelöscht'}); 
    }
    )
    .catch(error =>  {
      this.messageService.add({ severity: 'danger', summary: 'Error', detail: error }); 
    })
  }

}
