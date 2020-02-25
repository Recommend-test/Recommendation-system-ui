import { TestBed, async, inject } from '@angular/core/testing';

import { ProductManipulationGuardGuard } from './product-manipulation-guard.guard';

describe('ProductManipulationGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductManipulationGuardGuard]
    });
  });

  it('should ...', inject([ProductManipulationGuardGuard], (guard: ProductManipulationGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
