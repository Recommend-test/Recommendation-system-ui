import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from '../category/model/Category'
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = "http://localhost:8082/api/v1/categories";
  private productIdUrl = "http://localhost:8080/product/categories/";
  private updateProductUrl = "http://localhost:8080/product/categories/update";
  private deleteProductUrl = "http://localhost:8080/product/categories/delete";
  private categoriesSizeUrl = "http://localhost:8080/product/categories/size";

  constructor(private http: HttpClient) { }

  getcategories(offset: number, size: number): Observable<Category[]> {
    
    return this.http
      .get<Category[]>(this.categoriesUrl)
      .pipe(tap(this.handleData), catchError(this.handleError));
  }

  getcategoriesSize(): Observable<number> {
    return this.http.get<number>(this.categoriesSizeUrl);
  }

  getProductById(id: string): Observable<Category> {
    const url = `${this.productIdUrl}/${id}`;
    return this.http.get<Category>(url);
  }

  updateProduct(product: Category): Observable<Category> {
    const url = this.updateProductUrl;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Category>(url, product, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<string> {
    const url = `${this.deleteProductUrl}/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .delete<string>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  //You can make any changes on data before return
  private handleData(data: Category[]) {
    // data[0].productCode='MyProduct';
    // console.log(JSON.stringify(data));
  }

  //catch error
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
