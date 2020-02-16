import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AppConstatnts } from '../../utility/AppConstatnts';
import { Category } from 'src/app/model/Category';
import { Paginator } from 'src/app/model/Paginator';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  pageTitle: string = AppConstatnts.categoryListPageTitle;
  categories: Category[];
  allCategories: Category[];
  activePage: number = 1;
  totalRecords: number;
  recordsPerPage: number = 10;
  offset: number = 0;
  size: number = 30;
  nextCounter = 0;
  previousCounter = 0;
  cachedPagesSize = 3;
  start = 0;
  end = this.recordsPerPage;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadData(this.offset, this.size);
    this.nextCounter = this.recordsPerPage;
    this.previousCounter = this.recordsPerPage;
    this.activePage = 1;
  }


  displayActivePage(activePage: Paginator) {
    this.activePage = activePage.page;
    this.handleArrayChunck();
    if (activePage.type === 'next') {
      if (this.activePage % this.cachedPagesSize == 1) {
        this.offset += 1;
        this.loadData(this.offset, this.size);
      } else {
        this.categories = this.allCategories.slice(this.start, this.end);
      }
    } else if (activePage.type === 'previous') {
      if (this.activePage % this.cachedPagesSize == 0) {
        this.offset -= 1;
        this.loadData(this.offset, this.size);
      } else {
        this.categories = this.allCategories.slice(this.start, this.end);
      }

    }

  }

  
  compare(cat1, cat2) {
    let comparison = 0;
    if (cat1.id > cat2.id) {
      comparison = 1;
    } else if (cat1.id < cat2.id) {
      comparison = -1;
    }
    return comparison;
  }

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

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => { this.loadData(this.offset, this.size) }
    });
  }

  handleError(error: any) {
    console.log('Error happend while loading categories data' + JSON.stringify(error));
  }

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
}
