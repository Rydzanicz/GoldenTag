import {TestBed} from '@angular/core/testing';

import {InvoiceMailerService} from './invoice-mailer.service';

describe('InvoiceMailerService', () => {
  let service: InvoiceMailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceMailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
