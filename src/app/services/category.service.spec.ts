import { TestBed, ComponentFixture } from "@angular/core/testing";

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Category } from '../model/Category';

describe('CategoryService', () => {

  let httpTestController: HttpTestingController;
  let categoryService: CategoryService;
  let category: Category;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    httpTestController = TestBed.get(HttpTestingController);
    categoryService = TestBed.get(CategoryService);

  });


  it('test get category by id', () => {
    categoryService.getCategoryById('1').subscribe();
    let req = httpTestController.expectOne('http://localhost:8082/api/v1/categories/1');
    //req.flush({id:1,categoryName: "Clothes80123"});
    httpTestController.verify();
  });

  it('test get categories', () => {
    categoryService.getCategories(0, 1).subscribe();
    let req = httpTestController.expectOne('http://localhost:8082/api/v1/categories/page?offset=0&limit=1');
    //req.flush({productCategoryList: [ {id: 1, categoryName: "Clothes80123"}],totalCount: 35});
    httpTestController.verify();
  });

  it('test add category', () => {
    category = { id: null, categoryName: 'New Product',products:[] };
    categoryService.addCategory(category).subscribe();
    let req = httpTestController.expectOne('http://localhost:8082/api/v1/categories');
    httpTestController.verify();
  });

  it('test update category', () => {
    category = { id: 1, categoryName: 'New Product new',products:[] };
    categoryService.updateCategory(category).subscribe();
    let req = httpTestController.expectOne('http://localhost:8082/api/v1/categories');
    httpTestController.verify();
  });

  it('test delete category', () => {
    categoryService.deleteCategory(1).subscribe();
    let req = httpTestController.expectOne('http://localhost:8082/api/v1/categories/1');
    httpTestController.verify();
  });
});
