import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CurrencyService } from '../../../services/shared/currency.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  template: `
  <form [formGroup]="currencyForm">

  <div class="formgrid grid">
    <div class="field col">
      <label>Fremdwährungsbetrag</label>
            <input pInputText type="number" formControlName="exchangeValue"
              class="border-noround-right text-base text-900 surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
      </div>
    <div class="field col">
      <label>Bezahlt in</label>          
          <div class="card flex justify-content-center">
              <p-autoComplete [style]="{'height':'38px'}" class="text-base text-900 flex surface-overlay w-full border-round" formControlName="currency" [dropdown]="true" [suggestions]="filteredCurrencies" (completeMethod)="filterCurrency($event)" field="value">
                <ng-template let-currency pTemplate="item">
                  <div class="flex align-items-center gap-2">
                      <div>{{ currency.value }} - {{ currency.label }}</div>
                  </div>
                </ng-template>
              </p-autoComplete>
          </div>
    </div>
  </div>
  <div class="flex-auto">
        <label for="buttondisplay" class="block mb-2">Datum</label>
        <p-calendar formControlName="date" [style]="{'height':'38px'}" dateFormat="dd.mm.yy"></p-calendar>
  </div>
  </form>
  <div class="field mt-3">
          <label>Betrag in Euro</label>
          <input [(ngModel)]="euroValue" pInputText type="number" [disabled]="true"
            class="font-bold border-noround-right text-base text-900 surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
  </div>
  <div>
    <a href="https://bankenverband.de/service/waehrungsrechner/" target="_blank">Prüfung bei bankenverband.de</a>
  </div>
  <div class="flex align-items-end flex-wrap" [style]="{'height':'35vh'}">
    <button pButton class="btn-cic-submit justify-content-center" label="Übernehmen" icon="pi pi-check" [disabled]="!currencyForm.valid" (click)="close()"></button>
    <button pButton class="btn-cic-submit justify-content-center" label="Abbrechen" (click)="close()"></button>
  </div>

  `
})
export class CurrencyDialogComponent {

  currencyForm!: FormGroup
  instance!: DynamicDialogComponent;
  data: any;
  currencies: any[] = [];
  filteredCurrencies!: any[];
  selectedCurrency: any;
  euroValue: any;



  constructor(public ref: DynamicDialogRef, private dialogService: DialogService, private fb: FormBuilder, private currService: CurrencyService) {
    
    this.instance = this.dialogService.getInstance(this.ref);
  }

  async ngOnInit() {

    this.getCurrencies()

    this.createForm()

    this.currencyForm.valueChanges.subscribe((data) => {
      this.selectedCurrency = this.currencyForm.controls['currency']?.value.value
      let exchangeValue = this.currencyForm.controls['exchangeValue']?.value



      if(this.selectedCurrency && exchangeValue > 0) {
        let rate = this.calcExchange()
        console.log("🚀 ~ CurrencyDialogComponent ~ this.currencyForm.valueChanges.subscribe ~ rate:", rate)
      }
      
    })

    if(this.instance && this.instance.data) {
      this.data = this.instance.data
    }
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
      this.ref.close();
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

  createForm() {
    this.currencyForm = this.fb.group({
      exchangeValue: new FormControl(0),
      currency: new FormControl(''),
      date: new FormControl('')
    })
  }

  async calcExchange() {
    let rate = 1
    let targetCurrency = this.currencyForm.controls['currency']?.value.value
    let exchangeValue = this.currencyForm.controls['exchangeValue']?.value
    let exchangeDate = this.currencyForm.controls['date']?.value !== '' ? new Date(this.currencyForm.controls['date']?.value) : new Date()

    

    //rate = await this.currService.calcExChange(targetCurrency, exchangeDate)
    //console.log("🚀 ~ CurrencyDialogComponent ~ calcExchange ~ rate:", rate)

    //this.euroValue = (exchangeValue * rate).toFixed(2)
    this.euroValue = await this.currService.calcExchangeAmount(targetCurrency, exchangeDate, exchangeValue)
  }


}
