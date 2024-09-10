import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  services: number[] = [];
  servicesBudget: number = 0;
  webPrice: number = 0;
  pressupostos: Object[] = [];
  numPages: number = 0;
  numLang: number = 0;
    
  totalServices(selectedValues: number[]):number {
    return selectedValues.reduce(
      (accumulator: number, currentValue: number) => {
        return (accumulator + currentValue);
      },
      0
    );
  }

  // getWebPrice(): number {
  //   return this.webPrice;
  // } Quién lo usa?

  totalWebPrice(numPages: number, numLang: number) {
    this.webPrice = numPages * numLang * 30;
    this.numPages = numPages;
    this.numLang = numLang;
       
    return this.webPrice;
  }

  savePressupostInfo(Object: Object, seo: boolean, ads: boolean, web: boolean, preuPressuposat: number) {

    this.pressupostos.push(Object);

    if (seo) {
      this.pressupostos.push({ seo });
    }

    if (ads) {
      this.pressupostos.push({ ads });
    }

    if (web) {
      this.pressupostos.push({ web });
    }

    if (!web) {
      this.numLang = 0;
      this.numPages = 0;
    }
   
   if (web) {
      this.pressupostos.push({ numPages: this.numPages })
      this.pressupostos.push({ numLang: this.numLang })
   }

    this.pressupostos.push({ preuPressuposat : preuPressuposat })

    console.log(`Array pressupostos:`, JSON.stringify(this.pressupostos));
  } 
}
