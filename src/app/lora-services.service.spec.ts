import { TestBed } from '@angular/core/testing';

import { LoraServicesService } from './lora-services.service';

describe('LoraServicesService', () => {
  let service: LoraServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoraServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
