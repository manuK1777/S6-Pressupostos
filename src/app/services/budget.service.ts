import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  services: number[] = [];
  servicesBudget: number = 0;
  webPrice: number = 0;

  constructor() {}

  totalServices(selectedValues: number[]):number {
    return selectedValues.reduce(
      (accumulator: number, currentValue: number) => {
        return (accumulator + currentValue);
      },
      0
    );
  }

  getWebPrice(): number {
    return this.webPrice;
  }

  totalWebPrice(numPages: number, numLang: number) {
    this.webPrice = numPages * numLang * 30;
    return this.webPrice;
  }
}
