import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {

  budgetForm!: FormGroup;
  numPages: number = 1;
  numLang: number = 1;

  constructor() {   
    this.budgetForm = new FormGroup({
      numPages: new FormControl(this.numPages),
      numLang: new FormControl(this.numLang),
    });
  }

  incrementPages(): void {
    this.numPages++;
    this.budgetForm.get('numPages')?.setValue(this.numPages);
  }

  decrementPages(): void {
    if (this.numPages > 1) {
      this.numPages--;
      this.budgetForm.get('numPages')?.setValue(this.numPages);
    }
  }

  incrementLang(): void {
    this.numLang++;
    this.budgetForm.get('numLang')?.setValue(this.numLang);
  }

  decrementLang(): void {
    if (this.numLang > 1) {
      this.numLang--;
      this.budgetForm.get('numLang')?.setValue(this.numLang);
    }
  }

}
