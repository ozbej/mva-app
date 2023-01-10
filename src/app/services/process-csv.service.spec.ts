import { TestBed } from '@angular/core/testing';

import { ProcessCsvService } from './process-csv.service';

describe('ProcessCsvService', () => {
  let service: ProcessCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
