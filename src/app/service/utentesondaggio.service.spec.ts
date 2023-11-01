import { TestBed } from '@angular/core/testing';

import { UtentesondaggioService } from './utentesondaggio.service';

describe('UtentesondaggioService', () => {
  let service: UtentesondaggioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentesondaggioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
