import { TestBed } from '@angular/core/testing';

import { PuebloService } from './pueblo.service';

describe('PuebloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuebloService = TestBed.get(PuebloService);
    expect(service).toBeTruthy();
  });
});
