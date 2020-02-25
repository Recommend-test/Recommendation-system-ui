import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AppConstatnts } from '../../utility/AppConstants';
import { Category } from 'src/app/model/Category';
import { Paginator } from 'src/app/model/Paginator';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  pageTitle: string = AppConstatnts.categoryListPageTitle;
  categories: Category[];
  allCategories: Category[];
  activePage: number;
  totalRecords: number;
  recordsPerPage: number;
  offset: number;
  size: number;
  cachedPagesSize: number;
  start: number;
  end: number;
  errorMessage: string;


  /**
   * Used to create instance from CategoryService.
   * @param {CategoryService} categoryService
   * @memberof CategoryListComponent
   */
  constructor(private categoryService: CategoryService) { }


  /**
   * This method used to init variables and load category list data.
   * @memberof CategoryListComponent
   */
  ngOnInit() {
    this.activePage = 1;
    this.recordsPerPage = 10;
    this.offset = 0
    this.size = 30;
    this.cachedPagesSize = 3;
    this.start = 0;
    this.end = this.recordsPerPage;
    this.loadData(this.offset, this.size);
  }


  /**
   * This method used to handle pagination between pages.
   *
   * @param {Paginator} activePage contain page number and type (next,previous)
   * @memberof CategoryListComponent
   */
  displayActivePage(activePage: Paginator) {
    this.activePage = activePage.page;
    this.handleArrayChunck();
    if (activePage.type === AppConstatnts.next) {
      if (this.activePage % this.cachedPagesSize == 1) {
        this.offset += 1;
        this.loadData(this.offset, this.size);
      } else {
        this.categories = this.allCategories.slice(this.start, this.end);
      }
    } else if (activePage.type === AppConstatnts.previous) {
      if (this.activePage % this.cachedPagesSize == 0) {
        this.offset -= 1;
        this.loadData(this.offset, this.size);
      } else {
        this.categories = this.allCategories.slice(this.start, this.end);
      }
    }
  }


  /**
   * This method used to load categories based on offset and size.
   *
   * @param {number} offset Refer to page number.
   * @param {number} size Refer to number of records per page.
   * @memberof CategoryListComponent
   */
  loadData(offset: number, size: number) {
    this.categoryService.getCategories(offset, size).subscribe({
      next: (data) => {
        this.allCategories = data.productCategoryList;
        this.categories = this.allCategories.slice(this.start, this.end);
        this.totalRecords = data.totalCount;
      },
      error: (err) => this.handleError(err),
      complete: () => {
        console.log('Load categories data completed')
      }
    });
  }


  /**
   * This method used to delete category by id.
   *
   * @param {number} id The id of category.
   * @memberof CategoryListComponent
   */
  deleteCategory(id: number) {
    if (confirm(AppConstatnts.deleteCatConfirmationMessage)) {
      console.log('confirmed');
      this.categoryService.deleteCategory(id).subscribe({
        next: () => { this.loadData(this.offset, this.size) },
        error: (error) => { this.errorMessage = error.error.error }
      });
    }
  }


  /**
   * This method used to determine start and end to use them to get chunk of allCategories list.
   *
   * @memberof CategoryListComponent
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
   * @memberof CategoryListComponent
   */
  handleError(error: any) {
    console.log('Error happend while loading categories data' + JSON.stringify(error));
  }


  /**
   * This method used to close the error message.
   *
   * @memberof CategoryListComponent
   */
  closeErrorMessage() {
    this.errorMessage = null;
  }
}
