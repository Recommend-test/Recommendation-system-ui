import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManipulationComponent } from './category-manipulation.component';

describe('CategoryManipulationComponent', () => {
  let component: CategoryManipulationComponent;
  let fixture: ComponentFixture<CategoryManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
