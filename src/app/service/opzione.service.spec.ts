import { TestBed } from '@angular/core/testing';

import { OpzioneService } from './opzione.service';

describe('OpzioneService', () => {
  let service: OpzioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpzioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
