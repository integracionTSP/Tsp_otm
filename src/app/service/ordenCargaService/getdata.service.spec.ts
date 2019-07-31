import { TestBed } from '@angular/core/testing';

import { GetdataService } from '../ordenCargaService/getdata.service';

describe('GetdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetdataService = TestBed.get(GetdataService);
    expect(service).toBeTruthy();
  });
});
