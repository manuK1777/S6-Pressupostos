import { Component } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';

import { CommonModule, JsonPipe } from '@angular/common';
import { PanelComponent } from "../panel/panel.component";

@Component({
  selector: 'app-home',
  template: '{{seoPrice}}, {{adsPrice}}, {{webPrice}}',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {
 
  seoPrice: number = 300;
  adsPrice: number = 400;
  webPrice: number = 500;

  budgetForm!: FormGroup;
  selectedValues: number[] = [];
  preuPressuposat: number = 0;

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      seo: [false],
      ads: [false],
      web: [false],
    });
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

    this.preuPressuposat = this.selectedValues.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue;
      },
      0
    );
  }
}
