import { TestBed } from '@angular/core/testing';

import { HelpModalService } from './help-modal.service';

describe('HelpModalService', () => {
  let service: HelpModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
