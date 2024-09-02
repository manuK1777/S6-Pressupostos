import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  selectedServices: number[] = [];
  pressupost: number = 0;

  constructor() { }

  // pressupost: number = this.selectedServices.reduce(
  //   (accumulator: number, currentValue: number) => {
  //     return accumulator + currentValue;
  //   },0);

    priceServices(services: number[]) {

      this.pressupost = this.selectedServices.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },0);
      }
     // return this.pressupost + (numPages * numLang * 30);
    

    priceWebExtra(numPages: number, numLang: number) {

      return (numPages * numLang * 30);
    }


}