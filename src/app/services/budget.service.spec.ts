import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should calculate the total web price', () => {
    const budgetService = TestBed.inject(BudgetService);

    const numPages = 2;
    const numLang = 3;
    const expectedResult = numPages * numLang * 30;

    const result = budgetService.totalWebPrice(numPages, numLang);
    expect(result).toBe(expectedResult);
  
});

it ('should calculate the total services', () => {
  const budgetService = TestBed.inject(BudgetService);

  const selectedValues = [300, 400, 500];
  const expectedResult = 1200;

  const result = budgetService.totalServices(selectedValues);
  expect(result).toBe(expectedResult);
})
});
