import { TestBed, async, inject } from '@angular/core/testing';

import { CategoryManipulationGuard } from './category-manipulation.guard';

describe('CategoryManipulationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryManipulationGuard]
    });
  });

  it('should ...', inject([CategoryManipulationGuard], (guard: CategoryManipulationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
