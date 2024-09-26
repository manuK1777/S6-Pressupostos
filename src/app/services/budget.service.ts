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
  date: Date;
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
  // pressupostos: BudgetList = {
  //   budgets: []
  // };
  pressupostos: BudgetList = {
    budgets: [
      {
        contactDetails: {
          name: 'John Wayne',
          email: 'john@example.com',
          phone: '686764323',
        },
        seo: true,
        ads: false,
        web: true,
        preuPressuposat: 1000,
        numPages: 5,
        numLang: 2,
        date: new Date('2022-01-01'),
      },
      {
        contactDetails: {
          name: 'Alyssa Perry',
          email: 'alyssa@example.com',
          phone: '64434212',
        },
        seo: false,
        ads: true,
        web: false,
        preuPressuposat: 500,
        numPages: 3,
        numLang: 1,
        date: new Date('2022-02-01'),
      },
    ],
  };

  numPages: number = 1;
  numLang: number = 1;

  private budgetsSignal = signal<BudgetItem[]>(this.pressupostos.budgets);

  getBudgets() {
    return this.budgetsSignal();
  }

  addBudget(budget: BudgetItem) {
    this.pressupostos.budgets.push(budget);
    this.budgetsSignal.set([...this.budgetsSignal(), budget]);
  }

  removeBudget(index: number) {
    this.pressupostos.budgets.splice(index, 1);
    this.budgetsSignal.set(this.budgetsSignal().filter((_, i) => i !== index));
  }

  savePressupostInfo(
    contactDetails: any,
    seo: boolean,
    ads: boolean,
    web: boolean,
    preuPressuposat: number,
    currentDate: Date
  ): void {
    const budgetItem: BudgetItem = {
      contactDetails,
      seo,
      ads,
      web,
      preuPressuposat,
      numPages: this.numPages,
      numLang: this.numLang,
      date: currentDate,
    };

    this.addBudget(budgetItem);    
  }

  sortByDate() {
    this.budgetsSignal.set(
      this.pressupostos.budgets.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      )
    );
  }

  sortByAmount() {
    this.budgetsSignal.set(
      this.pressupostos.budgets.sort(
        (a, b) => b.preuPressuposat - a.preuPressuposat
      )
    );
  }

  sortByAlph() {
    this.budgetsSignal.set(
      this.pressupostos.budgets.sort((a, b) =>
        a.contactDetails.name.localeCompare(b.contactDetails.name)
      )
    );
  }

  sortByName(searchText: string) {
    
    if (searchText === '') {
      this.budgetsSignal.set(this.pressupostos.budgets);
    } else {
    const foundBudgets = this.pressupostos.budgets.filter((budget) => {
      return budget.contactDetails.name.toLowerCase().includes(searchText.toLocaleLowerCase());
    });

    if (foundBudgets.length > 0) {
      this.budgetsSignal.set(foundBudgets);
    } else {
      this.budgetsSignal.set(this.pressupostos.budgets)
      alert("Pressupost no trobat")
    }
  }
  }

  totalServices(selectedValues: number[]): number {
    return selectedValues.reduce(
      (accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      },
      0
    );
  }

  totalWebPrice(numPages: number, numLang: number) {
    this.webPrice = numPages * numLang * 30;
     return this.webPrice; 
  }
}
