import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})

export class PanelComponent {

  budgetForm!: FormGroup;
  numPages: number = 0;
  numLang: number = 0;
  webPrice: number = 0;
  
  ngOnInit(): void {
    this.budgetForm.get('numPages')?.setValue(this.numPages);
    this.budgetForm.get('numLang')?.setValue(this.numLang);
  }

  @Input() webPriceInput!: number;
  @Output() webPriceInputChanged = new EventEmitter<number>();

  constructor(private budgetService: BudgetService) {   
    this.budgetForm = new FormGroup({
      numPages: new FormControl(this.numPages),
      numLang: new FormControl(this.numLang),
    });

    this.budgetForm.controls['numPages'].valueChanges.subscribe((value) => {
      this.onNumPagesChange(value);
    });

    this.budgetForm.controls['numLang'].valueChanges.subscribe((value) => {
      this.onNumLangChange(value);
    });
  }

  incrementPages(): void {
    this.numPages++;
    this.budgetForm.get('numPages')?.setValue(this.numPages);
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput); 
  }

  decrementPages(): void {
    if (this.numPages > 0) {
      this.numPages--;
      this.budgetForm.get('numPages')?.setValue(this.numPages);
      this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
      this.webPriceInput = this.webPrice;
      this.webPriceInputChanged.emit(this.webPriceInput);
    }
  }

  incrementLang(): void {
    this.numLang++;
    this.budgetForm.get('numLang')?.setValue(this.numLang);
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput);
  }

  decrementLang(): void {
    if (this.numLang > 0) {
      this.numLang--;
      this.budgetForm.get('numLang')?.setValue(this.numLang);
      this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
      this.webPriceInput = this.webPrice;
      this.webPriceInputChanged.emit(this.webPriceInput);
    }
  }
  
  //Manual user input
  onNumPagesChange(value: number) {
    this.numPages = value;
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput);
  }

  onNumLangChange(value: number) {
    this.numLang = value;
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput);
  }
}






