import { TestBed } from '@angular/core/testing';

import { GastronomiaService } from './gastronomia.service';

describe('GastronomiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastronomiaService = TestBed.get(GastronomiaService);
    expect(service).toBeTruthy();
  });
});
