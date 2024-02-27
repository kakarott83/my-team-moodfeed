import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencySuffix]'
})
export class CurrencySuffixDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement) {
    let value = input.value;
    if (value) {
      // Parse the value
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        input.value = parsedValue.toFixed(2) + '€'; // Add Euro symbol after parsing
      }
    }
  }

  addCurrencyCode(value: string) {
    return value + '€'
  }
}