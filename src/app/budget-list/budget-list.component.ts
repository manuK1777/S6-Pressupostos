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
}
