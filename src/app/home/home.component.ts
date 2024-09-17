import { Component } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { CommonModule, JsonPipe } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { BudgetListComponent } from "../budget-list/budget-list.component";


@Component({
  selector: 'app-home',
  template: '{{seoPrice}}, {{adsPrice}}, {{webPrice}}',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, PanelComponent, BudgetListComponent],
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
  formIsInvalid: boolean = true;

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

  ngOnInit(): void {
    this.budgetForm.get('contactDetails')?.statusChanges.subscribe((status) => {
      this.formIsInvalid = status === 'INVALID';
    });
  }

  updatePreuPressuposat(webPriceInput: number): void {
    this.webPriceInput = webPriceInput;
    this.preuPressuposat = this.budgetService.totalServices(
      this.selectedValues
    );
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
      this.webPriceInput = 0;
    }

    this.updatePreuPressuposat(this.webPriceInput);
  }


  getSeoValue() {
    return this.budgetForm.get('seo')?.value;
  }

  getAdsValue() {
    return this.budgetForm.get('ads')?.value;
  }

  getWebValue() {
    return this.budgetForm.get('web')?.value;
  }


  onFormSubmit(): void {
    if (this.formIsInvalid === false) {
     
      const contactDetails = this.budgetForm.get('contactDetails')?.value;

      const seoExists = this.getSeoValue();
      const adsExists = this.getAdsValue();
      const webExists = this.getWebValue();

      const currentDate = new Date();

      this.budgetService.savePressupostInfo(contactDetails, seoExists, adsExists, webExists, this.preuPressuposat, currentDate);

      alert('Pressupost enviat correctament');

      this.budgetForm.reset({ onlySelf: true, emitEvent: false });
      this.selectedValues = [];
      this.webPriceInput = 0;
      this.preuPressuposat = 0;
    } 
  }
}
