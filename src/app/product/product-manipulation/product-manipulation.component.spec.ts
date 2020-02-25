import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManipulationComponent } from './product-manipulation.component';

describe('ProductManipulationComponent', () => {
  let component: ProductManipulationComponent;
  let fixture: ComponentFixture<ProductManipulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManipulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
