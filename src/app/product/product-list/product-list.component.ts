import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/model/Paginator';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/productservice.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/Category';
import { AppConstants } from 'src/app/utility/AppConstants';


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
  cachedPagesSize: number;
  start: number;
  end: number;
  errorMessage: string;
  allCategories: Category[];
  categoryId: number;



  /**
   * Used to create instance from productService.
   * @param {productService} productService
   * @memberof ProductListComponent
   */
  constructor(private productService: ProductService, private categoryService: CategoryService) { }


  /**
   * This method used to init variables and load product list data.
   * @memberof ProductListComponent
   */
  ngOnInit() {
    this.activePage = 1;
    this.recordsPerPage = 10;
    this.offset = 0
    this.size = 30;
    this.cachedPagesSize = 3;
    this.start = 0;
    this.end = this.recordsPerPage;
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
    this.handleArrayChunck();
    if (activePage.type === AppConstants.next) {
      if (this.activePage % this.cachedPagesSize == 1) {
        this.offset += 1;
        this.loadData(this.categoryId, this.offset, this.size);
      } else {
        this.products = this.allProducts.slice(this.start, this.end);
      }
    } else if (activePage.type === AppConstants.previous) {
      if (this.activePage % this.cachedPagesSize == 0) {
        this.offset -= 1;
        this.loadData(this.categoryId, this.offset, this.size);
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
   * This method used to load products based on offset and size.
   *
   * @param {number} offset Refer to page number.
   * @param {number} size Refer to number of records per page.
   * @memberof ProductListComponent
   */
  loadData(categoryId: number, offset: number, size: number) {
    this.productService.getProducts(categoryId, offset, size).subscribe({
      next: (data) => {
        this.allProducts = data.productList;
        this.products = this.allProducts.slice(this.start, this.end);
        this.totalRecords = data.totalCount;
      },
      error: (err) => this.handleError(err),
      complete: () => {
        console.log('Load products data completed')
      }
    });
  }



  /**
   * This method used to determine start and end to use them to get chunk of allProducts list.
   *
   * @memberof ProductListComponent
   */
  handleArrayChunck() {
    if (this.activePage % this.cachedPagesSize == 1) {
      this.start = 0;
      this.end = this.recordsPerPage;
    } else if (this.activePage % this.cachedPagesSize == 2) {
      this.start = this.recordsPerPage;
      this.end = this.recordsPerPage * 2;
    } else if (this.activePage % this.cachedPagesSize == 0) {
      this.start = this.recordsPerPage * 2;
      this.end = this.recordsPerPage * 3;
    }
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
    this.loadData(this.categoryId, this.offset, this.size);

  }


}
