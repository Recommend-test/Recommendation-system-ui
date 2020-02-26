import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/model/Category';
import { Paginator } from 'src/app/model/Paginator';
import { AppConstants } from 'src/app/utility/AppConstants';

/**
 *
 *
 * @export
 * @class CategoryListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  pageTitle: string = AppConstants.categoryListPageTitle;
  categories: Category[];
  allCategories: Category[];
  activePage: number;
  totalRecords: number;
  recordsPerPage: number;
  offset: number;
  size: number;
  cachedPagesCount: number;
  start: number;
  end: number;
  errorMessage: string;

  /**
   *Creates an instance of CategoryListComponent.
   * @param {CategoryService} categoryService
   * @memberof CategoryListComponent
   */
  constructor(private categoryService: CategoryService) { }


  /**
   *
   *
   * @memberof CategoryListComponent
   */
  ngOnInit() {
    this.activePage = 1;
    this.recordsPerPage = 10;
    this.offset = 0
    this.size = 10;
    this.cachedPagesCount = this.size/this.recordsPerPage ;
    this.start = 0;
    this.end = this.recordsPerPage;
    this.loadDataForNext(this.offset, this.size);
  }

  /**
   *
   *
   * @param {Paginator} activePage
   * @memberof CategoryListComponent
   */
  displayActivePage(activePage: Paginator) {
    this.activePage = activePage.page;
    if (activePage.type === AppConstants.next) {
      this.start = this.end;
      this.end += this.recordsPerPage;
      if (this.activePage % this.cachedPagesCount === 1 || this.recordsPerPage ===  this.size) {
        this.offset += 1;
        this.loadDataForNext(this.offset, this.size);
        this.categories = this.allCategories.slice(this.start, this.end);
      } else {
        this.categories = this.allCategories.slice(this.start, this.end);
      }
    }
    else if (activePage.type === AppConstants.previous) {
      this.start-=this.recordsPerPage;
      this.end-=this.recordsPerPage;
      if (this.activePage % this.cachedPagesCount === 0 || this.recordsPerPage ===  this.size) {
        this.offset -= 1;
        this.loadDataForPrevious(this.offset, this.size);
      } else {
        this.categories = this.allCategories.slice(this.start, this.end);
      }
    }
  }


 /**
  *
  *
  * @param {number} offset
  * @param {number} size
  * @memberof CategoryListComponent
  */
 loadDataForNext(offset: number, size: number) {
    this.categoryService.getCategories(offset, size).subscribe({
      next: (data) => {
        this.allCategories = data.productCategoryList;
        this.start = 0;
        this.end = this.recordsPerPage;
        this.categories = this.allCategories.slice(this.start, this.end);
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
    this.categoryService.getCategories(offset, size).subscribe({
      next: (data) => {
        this.allCategories = data.productCategoryList;
        this.end = this.allCategories.length;
        this.start = this.end - this.recordsPerPage;
        this.categories = this.allCategories.slice(this.start, this.end);
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
    this.categoryService.getCategories(offset, size).subscribe({
      next: (data) => {
        this.allCategories = data.productCategoryList;
        this.categories = this.allCategories.slice(this.start, this.end);
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
   * @param {number} id
   * @memberof CategoryListComponent
   */
  deleteCategory(id: number) {
    if (confirm(AppConstants.deleteCatConfirmationMessage)) {
      console.log('confirmed');
      this.categoryService.deleteCategory(id).subscribe({
        next: () => { this.loadDataAfterDelete(this.offset, this.size) },
        error: (error) => { this.errorMessage = error.error.error }
      });
    }
  }

  /**
   *
   *
   * @param {*} error
   * @memberof CategoryListComponent
   */
  handleError(error: any) {
    console.log('Error happend while loading categories data' + JSON.stringify(error));
  }

  /**
   *
   *
   * @memberof CategoryListComponent
   */
  closeErrorMessage() {
    this.errorMessage = null;
  }
}
