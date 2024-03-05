import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CurrencyService } from '../../../services/shared/currency.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  templateUrl: './currency-dialog.component.html',
  styleUrl: './currency-dialog.component.scss',
})
export class CurrencyDialogComponent {

  currencyForm!: FormGroup
  instance!: DynamicDialogComponent;
  data: any;
  currencies: any[] = [];
  filteredCurrencies!: any[];
  selectedCurrency: any;
  euroValue: any;
  resultObject = {value: 0, date: new Date(), itemId: 0};
  inputObject: any;
  isLoading = false;
  isCalculated = false;



  constructor(public ref: DynamicDialogRef, private dialogService: DialogService, private fb: FormBuilder, private currService: CurrencyService) {
    
    this.instance = this.dialogService.getInstance(this.ref);
    this.inputObject = this.instance.data;

    console.log(this.instance.data)
  }

  async ngOnInit() {
    this.isLoading = true;
    this.getCurrencies()
    this.createForm(this.inputObject)
    this.isLoading = false;
    await this.calcExchange()
    this.currencyForm.valueChanges.subscribe((data) => {
      this.isCalculated = false
    })
  }

  filterCurrency(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let index = 0; index < (this.currencies as any[]).length; index++) {
      const currency = (this.currencies as any[])[index];
      if(currency.value.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(currency)
      }
    }

    this.filteredCurrencies = filtered;

  }

  close() {
    this.ref.close(this.resultObject)
  }

  ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
  }

  async getCurrencies() {
    await this.currService.getCurrencyList().then(data => {
      this.currencies = data
    })
  }

  createForm(input: any) {    
    this.currencyForm = this.fb.group({
      exchangeValue: new FormControl(input.value),
      currency: new FormControl('CHF'),
      date: new FormControl(input.date !== null ? input.date : new Date())
    })
  }

  async calcExchange() {
    this.isCalculated = true
    let targetCurrency = this.currencyForm.controls['currency']?.value.value !== undefined ? this.currencyForm.controls['currency']?.value.value : this.currencyForm.controls['currency']?.value
    let exchangeValue = this.currencyForm.controls['exchangeValue']?.value == 0 ? 1 : this.currencyForm.controls['exchangeValue']?.value 
    let exchangeDate = this.currencyForm.controls['date']?.value !== null ? new Date(this.currencyForm.controls['date']?.value) : new Date()

    if(targetCurrency !== '' && exchangeDate !== undefined && exchangeValue > 0) {
      //this.euroValue = await this.currService.calcExchangeAmount(targetCurrency, exchangeDate, exchangeValue)
      this.euroValue = 58.85
      this.resultObject = {
        value: this.euroValue,
        date: exchangeDate,
        itemId: this.inputObject.index
    }}

    this.isCalculated = true
  }


}
