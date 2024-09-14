import { Injectable, signal } from '@angular/core';

interface BudgetItem {
  contactDetails: {
    name: string;
    email: string;
    phone: string;
  };
  seo: boolean;
  ads: boolean;
  web: boolean;
  preuPressuposat: number;
  numPages?: number;
  numLang?: number;
}

interface BudgetList {
  budgets: BudgetItem[];
}

@Injectable({
  providedIn: 'root',
})

export class BudgetService {
  services: number[] = [];
  servicesBudget: number = 0;
  webPrice: number = 0;
  pressupostos: BudgetList = {
    budgets: []
  };
  numPages: number = 0;
  numLang: number = 0;
    
  private budgetsSignal = signal<BudgetItem[]>(this.pressupostos.budgets);

  getBudgets() {
    return this.budgetsSignal();
  }

  addBudget(budget: BudgetItem) {
    this.pressupostos.budgets.push(budget);
    this.budgetsSignal.set([...this.budgetsSignal(), budget])
  }
 
  removeBudget(index: number) {
    this.pressupostos.budgets.splice(index, 1);
    this.budgetsSignal.set(this.budgetsSignal().filter((_, i) => i !== index));
  }

  savePressupostInfo(contactDetails: any, seo: boolean, ads: boolean, web: boolean, preuPressuposat: number): void {

    const budgetItem: BudgetItem = {
      contactDetails,
      seo,
      ads,
      web,
      preuPressuposat,
      numPages: this.numPages,
      numLang: this.numLang,
    };
  
    this.addBudget(budgetItem);
    console.log(this.pressupostos);
    
  } 

  totalServices(selectedValues: number[]):number {
    return selectedValues.reduce(
      (accumulator: number, currentValue: number) => {
        return (accumulator + currentValue);
      },
      0
    );
  }

  totalWebPrice(numPages: number, numLang: number) {
    this.webPrice = numPages * numLang * 30;
    this.numPages = numPages;
    this.numLang = numLang;
       
    return this.webPrice;
  }
}
