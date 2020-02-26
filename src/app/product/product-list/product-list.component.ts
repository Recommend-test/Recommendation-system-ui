import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/model/Paginator';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/productservice.service';
import { AppConstants } from 'src/app/utility/AppConstants';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/Category';
import { ProductDataService } from '../data-service/ProductsDataService';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = AppConstants.productListPageTitle;
  products: Product[];
  allProducts: Product[];
  activePage: number;
  totalRecords: number;
  recordsPerPage: number;
  offset: number;
  size: number;
  cachedPagesCount: number;
  start: number;
  end: number;
  errorMessage: string;
  allCategories: Category[];
  categoryId: number;
  showAddButton:boolean;



  /**
   * Used to create instance from productService.
   * @param {productService} productService
   * @memberof ProductListComponent
   */
  constructor(private productService: ProductService, private categoryService: CategoryService, private productDataService:ProductDataService ) { }


  /**
   * This method used to init variables and load product list data.
   * @memberof ProductListComponent
   */
  ngOnInit() {
    this.activePage = 1;
    this.recordsPerPage = 10;
    this.offset = 0
    this.size = 30;
    this.cachedPagesCount = this.size/this.recordsPerPage ;
    this.start = 0;
    this.end = this.recordsPerPage;
    this.showAddButton=true;
    this.loadAllCategoriesData();
  }


  /**
   * This method used to handle pagination between pages.
   *
   * @param {Paginator} activePage contain page number and type (next,previous)
   * @memberof ProductListComponent
   */
  displayActivePage(activePage: Paginator) {
    this.activePage = activePage.page;
    if (activePage.type === AppConstants.next) {
      this.start = this.end;
      this.end += this.recordsPerPage;
      if (this.activePage % this.cachedPagesCount == 1 || this.recordsPerPage ===  this.size) {
        this.offset += 1;
        this.loadDataForNext(this.offset, this.size);
        this.products = this.allProducts.slice(this.start, this.end);
      } else {
        this.products = this.allProducts.slice(this.start, this.end);
      }
    }
    else if (activePage.type === AppConstants.previous) {
      this.start-=this.recordsPerPage;
      this.end-=this.recordsPerPage;
      if (this.activePage % this.cachedPagesCount == 0 || this.recordsPerPage ===  this.size) {
        this.offset -= 1;
        this.loadDataForPrevious(this.offset, this.size);
      } else {
        this.products = this.allProducts.slice(this.start, this.end);
      }
    }
  }

  /**
     * This method used to load products based on offset and size.
     *
     * @memberof ProductListComponent
     */
  loadAllCategoriesData() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
        console.log(data.length);
      },
      error: (err) => this.handleLoadCategoriesError(err),
      complete: () => {
        console.log('Load categories data completed')
      }
    });
  }


  
 /**
  *
  *
  * @param {number} offset
  * @param {number} size
  * @memberof CategoryListComponent
  */
 loadDataForNext(offset: number, size: number) {
  this.productService.getProducts(this.categoryId,offset, size).subscribe({
    next: (data) => {
      this.allProducts = data.productList;
      this.start = 0;
      this.end = this.recordsPerPage;
      this.products = this.allProducts.slice(this.start, this.end);
      this.totalRecords = data.totalCount;
    },
    error: (err) => this.handleError(err),
    complete: () => {console.log('Load categories data completed')
    }
  });
}

/**
 *
 *
 * @param {number} offset
 * @param {number} size
 * @memberof CategoryListComponent
 */
loadDataForPrevious(offset: number, size: number) {
  this.productService.getProducts(this.categoryId,offset, size).subscribe({
    next: (data) => {
      this.allProducts = data.productList;
      this.end = this.allProducts.length;
      this.start = this.end - this.recordsPerPage;
      this.products = this.allProducts.slice(this.start, this.end);
      this.totalRecords = data.totalCount;
    },
    error: (err) => this.handleError(err),
    complete: () => {console.log('Load categories data completed')
    }
  });
}

/**
 *
 *
 * @param {number} offset
 * @param {number} size
 * @memberof CategoryListComponent
 */
loadDataAfterDelete(offset: number, size: number) {
  this.productService.getProducts(this.categoryId,offset, size).subscribe({
    next: (data) => {
      this.allProducts = data.productList;
      this.products = this.allProducts.slice(this.start, this.end);
      this.totalRecords = data.totalCount;
    },
    error: (err) => this.handleError(err),
    complete: () => {console.log('Load categories data completed')
    }
  });
}
   /**
   * This method used to delete product by id.
   *
   * @param {number} id The id of product.
   * @memberof ProductListComponent
   */
  deleteProduct(id: number) {
    if (confirm(AppConstants.deleteProductConfirmationMessage)) {
      console.log('confirmed');
      this.productService.deleteProduct(id).subscribe({
        next: () => { this.loadDataAfterDelete(this.offset, this.size) },
        error: (error) => { this.errorMessage = error.error.error }
      });
    }
  }


  setSharedData(product:Product){
   this.productDataService.updateProduct(product);
   this.productDataService.updateCategoryId(this.categoryId);
  }


  /**
   * This method used to log error if it happend while loading data.
   * @param {*} error
   * @memberof ProductListComponent
   */
  handleError(error: any) {
    console.log('Error happend while loading products data' + JSON.stringify(error));
  }

  /**
   * This method used to log error if it happend while loading data.
   * @param {*} error
   * @memberof ProductListComponent
   */
  handleLoadCategoriesError(error: any) {
    console.log('Error happend while loading products data' + JSON.stringify(error));
  }


  /**
   * This method used to close the error message.
   *
   * @memberof ProductListComponent
   */
  closeErrorMessage() {
    this.errorMessage = null;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term.trim() === '' ? []
        : (this.allCategories.filter(v => v.categoryName.toLowerCase().indexOf(term.trim().toLowerCase()) > -1).slice(0, 10)))
    );

  formatter = (category: Category) => category.categoryName;

  onSelectCategory(selectedItem: any) {
    this.categoryId = selectedItem.item.id;
    this.loadDataForNext(this.offset, this.size);
    this.productDataService.updateCategoryId(this.categoryId);
    this.showAddButton=false;
  }


}
