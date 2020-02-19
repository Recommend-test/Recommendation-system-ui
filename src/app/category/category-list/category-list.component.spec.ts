import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryListResponse } from 'src/app/model/CategoryListResponse';
import { of } from 'rxjs';
import { By } from "@angular/platform-browser";

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let mockCategoryService;
  let categoryListResponse: CategoryListResponse;


  beforeEach(async(() => {
    mockCategoryService = jasmine.createSpyObj(['getCategories', 'getCategoryById', 'addCategory', 'updateCategory', 'deleteCategory'])
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }]
    })
      .compileComponents();
    categoryListResponse = { "productCategoryList": [{ id: 1, categoryName: 'Mobiles', products: [] }, { id: 2, categoryName: 'Clothes', products: [] }], "totalCount": 1 };

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
  });

  it('Test load categories', () => {
    mockCategoryService.getCategories.and.returnValue(of(categoryListResponse));
    fixture.detectChanges();
    expect(fixture.componentInstance.allCategories.length).toEqual(2);
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toEqual(3);
  });

  it('Test delete category', () => {
    categoryListResponse = { "productCategoryList": [{ id: 1, categoryName: 'Mobiles', products: [] }], "totalCount": 1 };
    mockCategoryService.getCategories.and.returnValue(of(categoryListResponse));
    mockCategoryService.deleteCategory.and.returnValue(of(''));
    fixture.componentInstance.deleteCategory(1);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tr')).length).toEqual(2);
  });


});
