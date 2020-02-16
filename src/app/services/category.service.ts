import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../model/Category'
import { tap, catchError } from 'rxjs/operators';
import { CategoryListResponse } from '../model/CategoryListResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl = "http://localhost:8082/api/v1/categories/page";
  private categoryIdUrl = "http://localhost:8082/api/v1/categories/";
  private updateCategoryUrl = "http://localhost:8082/api/v1/categories";
  private addCategoryUrl = "http://localhost:8082/api/v1/categories";
  private deleteCategoryUrl = "http://localhost:8082/api/v1/categories/";


  constructor(private http: HttpClient) { }

  //TODO : get categories in range.
  getCategories(offset: number, size: number): Observable<CategoryListResponse> {
    console.log('offset'+ offset+ ' limit'+size);
    const params = new HttpParams().
    set('offset', offset.toString()).
    set('limit',size.toString());
    return this.http
      .get<CategoryListResponse>(this.categoriesUrl,{params:params});
  }

  
  getCategoryById(id: string): Observable<Category> {
    const url = `${this.categoryIdUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<Category>(this.addCategoryUrl, category, { headers });
  }

  updateCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Category>(this.updateCategoryUrl, category, { headers });
  }

  deleteCategory(id: number): Observable<string> {
    const url = `${this.deleteCategoryUrl}/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .delete<string>(url, { headers });
  }

}
