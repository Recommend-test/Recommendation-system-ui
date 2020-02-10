import { Component, OnInit } from '@angular/core';
import { Category } from '../model/Category'
import { CategoryService } from '../../services/category.service';
import { AppConstatnts } from '../../utility/AppConstatnts';

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
  offset:number=0;
  size:number=30;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategoriesCount().subscribe({
      next: (data) => {
        console.log(data);
        this.totalRecords = data;
      }
    });
    this.loadData();
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber
    this.categories = this.allCategories.slice((activePageNumber - 1) * this.recordsPerPage, (activePageNumber) * this.recordsPerPage);
  }

  loadData() {
    this.categoryService.getCategories(this.offset,this.size).subscribe({
      next: (data) => {
        this.allCategories = data;
        this.categories = data.slice(this.activePage - 1, this.recordsPerPage);
        this.activePage = 1;
      },
      error: (err) => this.handleError(err),
      complete: () => {
        console.log('Load categories data completed')
      }
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => { this.loadData() }
    });
  }

  handleError(error: any) {
    console.log('Error happend while loading categories data' + JSON.stringify(error));
  }

}
