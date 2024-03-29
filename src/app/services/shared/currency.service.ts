import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/';
  private baseCurrency = 'EUR'
  private apiKey = 'fca_live_qRg3wav2pNeIlOher9ONDkHAvvqa5Y3asFWe3ufQ'
  private options = {
    headers: {
      'X-RapidAPI-Key': '68d2855624msh2af7aed9cd9a3a8p1cf485jsn059ff3f7fb92',
      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  }
  currencies: {value: string, label: string}[] = [];

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  async calculateRate(targetCurrency: string, value: number, exchangeDate: Date) {

    this.http.get(`${this.apiUrl}symbols`, this.options)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error fetching exchange rates:', error);
        }
    );
  }

  getCurrencyList() {
    return firstValueFrom(this.http.get(`${this.apiUrl}symbols`, this.options)).then(data => {
      const symbols = data as { symbols: { [key: string]: string } };
      return this.currencies = Object.keys(symbols.symbols)
        .map(key => ({ value: key, label: symbols.symbols[key] }))
        .sort((a, b) => a.value.localeCompare(b.value))
      
    })
  }

  async calcExChange(targetCurrency: string, exDate: Date) {
    let data: any
    let exchangeDate = exDate == null ? new Date() : exDate
    let date = this.datePipe.transform(exchangeDate, 'yyyy-MM-dd')
    console.log(`${this.apiUrl}${date}?from=${targetCurrency}&to=${this.baseCurrency}`)
    try {
      data = await firstValueFrom(this.http.get(`${this.apiUrl}${date}?from=${this.baseCurrency}&to=${targetCurrency}`, this.options))
      
      console.log("🚀 ~ CurrencyService ~ calcExChange ~ data:", data)
    } catch {
      console.log('Error')
    }
    return data.rates[targetCurrency]
  }

  async calcExchangeAmount(targetCurrency: string, exDate: Date, amount: number) {

    let data: any
    let exchangeDate = exDate == null ? new Date() : exDate
    let date = this.datePipe.transform(exchangeDate, 'yyyy-MM-dd')
    console.log(`${this.apiUrl}${date}?from=${targetCurrency}&to=${this.baseCurrency}`)
    try {
      data = await firstValueFrom(this.http.get(`${this.apiUrl}convert?from=${targetCurrency}&to=${this.baseCurrency}&amount=${amount}&date=${date}`, this.options))
      console.log("🚀 ~ CurrencyService ~ calcExChange ~ data:", data)
    } catch {
      console.log('Error')
    }
    return data.result.toFixed(2)

  }





  


}
