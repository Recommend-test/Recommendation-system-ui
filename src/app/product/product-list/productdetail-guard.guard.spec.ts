import { TestBed, async, inject } from '@angular/core/testing';

import { ProductdetailGuardGuard } from './productdetail-guard.guard';

describe('ProductdetailGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductdetailGuardGuard]
    });
  });

  it('should ...', inject([ProductdetailGuardGuard], (guard: ProductdetailGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
