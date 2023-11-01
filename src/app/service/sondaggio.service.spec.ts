import { TestBed } from '@angular/core/testing';

import { SondaggioService } from './sondaggio.service';

describe('SondaggioService', () => {
  let service: SondaggioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SondaggioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
