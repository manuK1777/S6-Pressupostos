import { Component, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { CommonModule, JsonPipe, isPlatformBrowser } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    JsonPipe,
    PanelComponent,
    BudgetListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  isBrowser: boolean = false;

  seoPrice: number = 300;
  adsPrice: number = 400;
  webPrice: number = 500; 

  budgetForm!: FormGroup;
  selectedValues: number[] = [];
  preuPressuposat: number = 0;
  formIsInvalid: boolean = true;
  webPriceInput: number = 0;
  numPages!: number;
  numLang!: number;
  checkedSeo!: boolean;
  checkedAds!: boolean;
  checkedWeb!: boolean;
  name: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {

    this.isBrowser = isPlatformBrowser(this.platformId); 

    this.budgetForm = this.fb.group({
      CampaingSeo: [false],
      Ads: [false],
      WebPage: [false],

      contactDetails: this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{1,40}$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        email: ['', [Validators.required, Validators.email]],
      }),
    });

    this.route.queryParams.subscribe((params) => {
      if (params['CampaingSeo']) {
        this.budgetForm.patchValue({
          CampaingSeo: params['CampaingSeo'] === 'true',
        });
      }
      if (params['Ads']) {
        this.budgetForm.patchValue({ Ads: params['Ads'] === 'true' });
      }
      if (params['WebPage']) {
        this.budgetForm.patchValue({ WebPage: params['WebPage'] === 'true' });
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void { 
    
    this.budgetForm.get('contactDetails')?.statusChanges.subscribe((status) => {
      this.formIsInvalid = status === 'INVALID';
    });

    this.route.queryParams.subscribe((params) => {
      if (params['CampaingSeo']) {
        this.budgetForm.patchValue({ CampaingSeo: params['CampaingSeo'] === 'true' });
      }
      if (params['Ads']) {
        this.budgetForm.patchValue({ Ads: params['Ads'] === 'true' });
      }
      if (params['WebPage']) {
        this.budgetForm.patchValue({ WebPage: params['WebPage'] === 'true' });
      }
      if (params['pages']) {
        this.numPages = parseInt(params['pages'], 10);
      }
      if (params['lang']) {
        this.numLang = parseInt(params['lang'], 10);
      }
  
      this.selectedValues = [];
      if (params['CampaingSeo'] === 'true') {
        this.selectedValues.push(this.seoPrice);
      }
      if (params['Ads'] === 'true') {
        this.selectedValues.push(this.adsPrice);
      }
      if (params['WebPage'] === 'true') {
        this.selectedValues.push(this.webPrice);
      }
  
      this.updatePreuPressuposat();
      this.cdr.detectChanges(); 
    });
  }
 
  updateUrl() {
    const formValue = this.budgetForm.value;
  
    const queryParams: {
      [key: string]: boolean | number | undefined;
      WebPage?: boolean;
      Ads?: boolean;
      CampaingSeo?: boolean;
      pages?: number;
      lang?: number;
    } = {};
  
    if (formValue.WebPage) {
      queryParams.WebPage = formValue.WebPage;
    }

    if (formValue.CampaingSeo) { 
      queryParams.CampaingSeo = formValue.CampaingSeo;
    } 

    if (formValue.WebPage) {
      queryParams.pages = this.numPages;
      queryParams.lang = this.numLang;
    } else {
      queryParams.pages = undefined;
      queryParams.lang = undefined;
    }
  
    if (formValue.Ads) {
      queryParams.Ads = formValue.Ads;
    } 
  
    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([key, value]) => value !== undefined && value !== false)
    );

    this.router.navigate([], {
      queryParams: filteredQueryParams,
      queryParamsHandling: 'replace',
     
    });

    this.updatePreuPressuposat();
  }

  updateWebPrice(webPriceInput: number) {
    this.webPriceInput = webPriceInput;
    this.updatePreuPressuposat();
  }

  updatePreuPressuposat(): void {
    this.preuPressuposat = this.budgetService.totalServices(
      this.selectedValues
    );
    this.preuPressuposat = this.preuPressuposat + this.webPriceInput;
  }

  onCheckboxChange(event: Event, value: number) {
    const checkbox = (event.target as HTMLInputElement);
    const isChecked = checkbox.checked;

    if (isChecked) {
      this.selectedValues.push(value);
    } else {
      const index = this.selectedValues.indexOf(value);
      this.numPages = 1;
      this.numLang = 1;
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
    }

    if (checkbox.id === 'flexCheckWebPage' && checkbox.checked === false) {
      this.webPriceInput = 0;
    }
   
    this.updateWebPrice(this.webPriceInput);
    this.updateUrl();
  }

  getSeoValue() {
    return this.budgetForm.get('CampaingSeo')?.value;
  }

  getAdsValue() {
    return this.budgetForm.get('Ads')?.value;
  }

  getWebValue() {
    return this.budgetForm.get('WebPage')?.value;
  }

  onNumPagesChanged(numPages: any) {
    this.numPages = numPages;
    this.updateUrl();
  }
  onNumLangChanged(numLang: any) {
    this.numLang = numLang;
    this.updateUrl();
  }

  onFormSubmit(): void {
    if (this.formIsInvalid === false) {
      const contactDetails = this.budgetForm.get('contactDetails')?.value;

      const seoExists = this.getSeoValue();
      const adsExists = this.getAdsValue();
      const webExists = this.getWebValue();

      const currentDate = new Date();

      this.budgetService.savePressupostInfo(
        contactDetails,
        seoExists,
        adsExists,
        webExists,
        this.preuPressuposat,
        currentDate
      );

      alert('Pressupost enviat correctament');

      this.budgetForm.reset({ onlySelf: true, emitEvent: false });
      this.selectedValues = [];
      this.numPages = 1;
      this.numLang = 1;
      this.webPriceInput = 0;
      this.preuPressuposat = 0;
      
      this.updateUrl();
    }
  }
}
