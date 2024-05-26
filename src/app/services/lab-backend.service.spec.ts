import { TestBed } from '@angular/core/testing';

import { LabBackendService } from './lab-backend.service';

describe('LabBackendService', () => {
  let service: LabBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
