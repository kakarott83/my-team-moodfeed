import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../model/customer';
import { MessageService } from 'primeng/api';
import { FireService } from '../../../services/fire';
import { DataService } from '../../../services/shared/data.service';
import { Country } from '../../../model/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {

  customerForm!: FormGroup
  myCustomer!: Customer
  countryList!: Country[]
  countryList2!: Country[]
  isLoading = false

  constructor(private fire: FireService, private fb: FormBuilder, private dataService: DataService, private messageService: MessageService) {}
  
  async ngOnInit() {
    // this.fire.getAllCountries().subscribe(data => {
    //   console.log("🚀 ~ CustomerFormComponent ~ this.fire.getAllCountries ~ data:", data)
    //   this.countryList = data
    // })


    this.dataService.selectedCustomer.subscribe(data => {
      this.createForm(data)
    })
  }


  

  async createForm(item?: Customer) {
  console.log("🚀 ~ CustomerFormComponent ~ createForm ~ item:", item)
  this.isLoading = true

  this.countryList = await this.fire.getAllCountriesPromise()

    if(item) {
      this.customerForm = this.fb.group({
        name: item.name,
        city: item.city,
        country: item.country,
        id: item.id
      })
    } else {
      this.customerForm = this.fb.group({
        name: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        id: new FormControl()
      })
    }

    this.isLoading = false
    
  }

  getAllCountries() {
    return this.fire.getAllCountriesPromise()
  }

  createCustomer() {
    this.myCustomer = {
      name: this.customerForm.controls['name'].value,
      city: this.customerForm.controls['city'].value,
      country: this.customerForm.controls['country'].value,
    }
  }

  saveCustomer() {
    this.createCustomer();
    const id = this.customerForm.controls['id']?.value

    if(id) {
      this.fire.updateCustomer(id, this.myCustomer)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Änderung gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    } else {
      this.fire.createCustomer(this.myCustomer)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Zweck gespeichert' });
      })
      .catch(error => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: error });
      })
    }

    this.resetForm()
  }

  resetForm() {
    this.customerForm.reset()
  }
}
