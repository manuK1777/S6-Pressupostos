import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { HelpModalService } from '../services/help-modal.service';
import { ModalComponent } from "../shared/modal/modal.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})

export class PanelComponent {

  budgetForm!: FormGroup;
  numPages: number = 1;
  numLang: number = 1;
  webPrice: any;
  helpModalType: string = "";
  

  @Input() webPriceInput!: number;
  @Output() webPriceInputChanged = new EventEmitter<number>();
  @Output() numPagesChanged = new EventEmitter<number>();
  @Output() numLangChanged= new EventEmitter<number>();
  @Output() modalTextEvent = new EventEmitter<string>();

  openModal(type: string) {
   this.helpModalType = type;
   this.modalTextEvent.emit(this.helpModalType);
  }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      if (params['pages']) {
        this.numPages = parseInt(params['pages'], 10);
      }
      if (params['lang']) {
        this.numLang = parseInt(params['lang'], 10);
      }
    });

    this.budgetForm.get('numPages')?.setValue(this.numPages);
    this.budgetForm.get('numLang')?.setValue(this.numLang);
  }

  constructor (private budgetService: BudgetService, private HelpModalService: HelpModalService,
    private route: ActivatedRoute) {   
  
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
    this.numPagesChanged.emit(this.numPages); 
  }

  decrementPages(): void {
    if (this.numPages > 1) {
      this.numPages--;
      this.budgetForm.get('numPages')?.setValue(this.numPages);
      this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
      this.webPriceInput = this.webPrice;
      this.webPriceInputChanged.emit(this.webPriceInput);
      this.numPagesChanged.emit(this.numPages); 
    }
  }

  incrementLang(): void {
    this.numLang++;
    this.budgetForm.get('numLang')?.setValue(this.numLang);
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput);
    this.numLangChanged.emit(this.numLang);
  }

  decrementLang(): void {
    if (this.numLang > 1) {
      this.numLang--;
      this.budgetForm.get('numLang')?.setValue(this.numLang);
      this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
      this.webPriceInput = this.webPrice;
      this.webPriceInputChanged.emit(this.webPriceInput);
      this.numLangChanged.emit(this.numLang);
    }
  }
  
  // Manual user input
  onNumPagesChange(value: number) {
    this.numPages = value;
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput);
    this.numPagesChanged.emit(this.numPages); 
  }

  onNumLangChange(value: number) {
    this.numLang = value;
    this.webPrice = this.budgetService.totalWebPrice(this.numPages, this.numLang);
    this.webPriceInput = this.webPrice;
    this.webPriceInputChanged.emit(this.webPriceInput);
    this.numLangChanged.emit(this.numLang);
  }
}






