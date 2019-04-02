import { TestBed } from '@angular/core/testing';

import { EsriService } from './esri.service';

describe('EsriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EsriService = TestBed.get(EsriService);
    expect(service).toBeTruthy();
  });
});
