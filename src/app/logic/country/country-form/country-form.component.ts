import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/shared/data.service';
import { MessageService } from 'primeng/api';
import { FireService } from '../../../services/fire';
import { Country } from '../../../model/country';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrl: './country-form.component.scss'
})
export class CountryFormComponent implements OnInit {

  countryForm!: FormGroup
  myCountry!: Country

  constructor(private fire: FireService, private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.dataService.selectedCountry.subscribe(data => {
      this.createForm(data)
    })
  }

  createForm(item?: Country) {

    if(item) {
      this.countryForm = this.fb.group({
        name: item.name,
        code: item.code,
        rate: item.rate,
        halfRate: item.halfRate,
        id: item.id
      })
    } else {
      this.countryForm = this.fb.group({
        name: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        rate: new FormControl('', Validators.required),
        halfRate: new FormControl('', Validators.required),
        id: new FormControl()
      })
    }
    
  }

  createCountry() {
    this.myCountry = {
      name: this.countryForm.controls['name'].value,
      code: this.countryForm.controls['code'].value,
      rate: this.countryForm.controls['rate'].value,
      halfRate: this.countryForm.controls['halfRate'].value
    }
  }

  saveCountry() {
    this.createCountry();
    const id = this.countryForm.controls['id']?.value

    if(id) {
      this.fire.updateCountry(id, this.myCountry)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Änderung gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    } else {
      this.fire.createCountry(this.myCountry)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    }


    this.countryForm.reset()
  }


}
