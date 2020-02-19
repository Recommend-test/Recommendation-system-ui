import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { of, Observable } from 'rxjs';
import { By } from "@angular/platform-browser";
import { CategoryManipulationComponent } from './category-manipulation.component';
import { Category } from 'src/app/model/Category';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Params, ActivatedRoute, convertToParamMap } from '@angular/router';



describe('CategoryManipulationComponent', () => {
  let fixture: ComponentFixture<CategoryManipulationComponent>;
  let mockCategoryService;
  let category: Category;

  beforeEach(async(() => {
    mockCategoryService = jasmine.createSpyObj(['getCategoryById', 'addCategory', 'updateCategory']);
    TestBed.configureTestingModule({
      declarations: [CategoryManipulationComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [{ provide: CategoryService, useValue: mockCategoryService },
      { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '0' })) } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryManipulationComponent);
  });

  it('Test get category by id', () => {
    category = { id: 1, categoryName: 'Mobiles', products: [] };
    mockCategoryService.getCategoryById.and.returnValue(of(category));
    fixture.detectChanges();
    fixture.componentInstance.getCategory('1');
    expect(fixture.componentInstance.categoryForm.get('categoryName').value).toEqual('Mobiles');
  });

  it('Test update category', () => {

    TestBed.get(ActivatedRoute).paramMap = of({ id: '1' });
    category = { id: 1, categoryName: 'Clothes', products: [] };
    fixture.componentInstance.category = category;
    mockCategoryService.getCategoryById.and.returnValue(of(category));
    fixture.detectChanges();
    mockCategoryService.updateCategory.and.returnValue(of(''));
    fixture.componentInstance.updateCategory();
    fixture.detectChanges();
    expect(fixture.componentInstance.category.categoryName).toEqual('Clothes');
  });

  it('Test add category', () => {
    category = { id: 0, categoryName: 'Mobiles', products: [] };
    fixture.componentInstance.category = category;
    fixture.detectChanges();
    mockCategoryService.addCategory.and.returnValue(of(category));
    fixture.componentInstance.updateCategory();
    fixture.detectChanges();
    expect(fixture.componentInstance.category.categoryName).toEqual('Mobiles');
  });


});
