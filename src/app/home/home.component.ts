import { Component } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { CommonModule, JsonPipe } from '@angular/common';
import { PanelComponent } from "../panel/panel.component";
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  template: '{{seoPrice}}, {{adsPrice}}, {{webPrice}}',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {
 
  webPriceInput: number = 0;

  seoPrice: number = 300;
  adsPrice: number = 400;
  webPrice: number = 500;

  budgetForm!: FormGroup;
  selectedValues: number[] = [];
  preuPressuposat: number = 0;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      seo: [false],
      ads: [false],
      web: [false],

      contactDetails: this.fb.group({
        name: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        email: ['', [Validators.required, Validators.email]],
      }),
    });
  }

  //this.budgetForm.get('contactDetails').valid, para chequear la validez de
  //los datos introducidos en el formulario antes de guardar.

  updatePreuPressuposat(webPriceInput: number): void {
   
    this.webPriceInput = webPriceInput;
    this.preuPressuposat = this.budgetService.totalServices(this.selectedValues);
    this.preuPressuposat = this.preuPressuposat + this.webPriceInput;    
  }

  onCheckboxChange(event: Event, value: number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedValues.push(value); 
    } else {
      const index = this.selectedValues.indexOf(value);    
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
    }
 
    if (this.budgetForm.get('web')?.value === false) {
      this.webPriceInput = 0;}

    this.updatePreuPressuposat(this.webPriceInput);
   }
}
