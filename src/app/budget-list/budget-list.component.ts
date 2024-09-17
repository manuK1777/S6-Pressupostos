import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {
  
  budgets: any;
  constructor(private budgetService: BudgetService) {
    this.budgets = this.budgetService.getBudgets();
  }

  isSelectedDate = false;
  isSelectedImport = false;
  isSelectedName = false;

  sortByDate() {
    this.budgetService.sortByDate();
    this.isSelectedDate = true;
    this.isSelectedImport = false;
    this.isSelectedName = false;
  }

  sortByAmount() {
    this.budgetService.sortByAmount();
    this.isSelectedImport = true;
    this.isSelectedDate = false;
    this.isSelectedName = false;
  }

  sortByName() {
    this.budgetService.sortByName();
    this.isSelectedName = true;
    this.isSelectedDate = false;
    this.isSelectedImport = false;
  }
}
