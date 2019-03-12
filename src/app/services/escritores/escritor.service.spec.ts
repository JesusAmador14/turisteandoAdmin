import { TestBed } from '@angular/core/testing';

import { EscritorService } from './escritor.service';

describe('EscritorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscritorService = TestBed.get(EscritorService);
    expect(service).toBeTruthy();
  });
});
