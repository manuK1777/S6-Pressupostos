import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {
  
  budgets: any;
  constructor(private budgetService: BudgetService) {
    this.budgets = this.budgetService.getBudgets();
  }

  searchTextControl = new FormControl('')

  isSelectedDate = false;
  isSelectedImport = false;
  isSelectedName = false;

  filteredBudgets: any;

  sortByDate() {
    this.budgetService.sortByDate();
    this.budgets = this.budgetService.getBudgets();
    this.resetSearch();
    this.isSelectedDate = true;
    this.isSelectedImport = false;
    this.isSelectedName = false;
  }

  sortByAmount() {
    this.budgetService.sortByAmount();
    this.budgets = this.budgetService.getBudgets();
    this.resetSearch();
    this.isSelectedImport = true;
    this.isSelectedDate = false;
    this.isSelectedName = false;
  }

  sortByAlph() {
    this.budgetService.sortByAlph();
    this.budgets = this.budgetService.getBudgets();
    this.resetSearch();
    this.isSelectedName = true;
    this.isSelectedDate = false;
    this.isSelectedImport = false;
  }

  sortByName(searchText: string | null) {
     
    if (searchText !== null) {
      this.budgetService.sortByName(searchText);
      this.budgets = this.budgetService.getBudgets();
    } else {
      this.budgets = this.budgetService.getBudgets();
    }
  }

  resetSearch() { 
    this.searchTextControl.setValue('');
  }
}
