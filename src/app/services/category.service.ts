import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../model/Category'
import { tap, catchError } from 'rxjs/operators';
import { CategoryListResponse } from '../model/CategoryListResponse';

@Injectable()
export class CategoryService {

  private baseUrl = "http://localhost:8082/api/v1/categories";


  /**
   * Creates instance of HttpClient.
   * @param {HttpClient} http
   * @memberof CategoryService
   */
  constructor(private http: HttpClient) { }


  /**
   * This method used to load categories based on offset and size.
   *
   * @param {number} offset Refer to page number.
   * @param {number} size Refer to number of records per page.
   * @returns {Observable<CategoryListResponse>}
   * @memberof CategoryService
   */
  getCategories(offset: number, size: number): Observable<CategoryListResponse> {
    const params = new HttpParams().
      set('offset', offset.toString()).
      set('limit', size.toString());
    const url = `${this.baseUrl}/page`;
    return this.http
      .get<CategoryListResponse>(url, { params: params });
  }


  /**
   * This method used to get category by id.
   *
   * @param {string} id category id.
   * @returns {Observable<Category>}
   * @memberof CategoryService
   */
  getCategoryById(id: string): Observable<Category> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Category>(url);
  }


  /**
   * This method used to add category.
   *
   * @param {Category} category
   * @returns {Observable<Category>}
   * @memberof CategoryService
   */
  addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<Category>(this.baseUrl, category, { headers });
  }


  /**
   * This method used to update category
   *
   * @param {Category} category The updated category.
   * @returns {Observable<Category>}
   * @memberof CategoryService
   */
  updateCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Category>(this.baseUrl, category, { headers });
  }


  /**
   *
   * This method used to delete category by id.
   * @param {number} id
   * @returns {Observable<string>}
   * @memberof CategoryService
   */
  deleteCategory(id: number): Observable<string> {
    const url = `${this.baseUrl}/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .delete<string>(url, { headers });
  }

}
