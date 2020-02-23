import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListResponse } from '../model/ProductListResponse';


@Injectable()
export class ProductService {

  private baseUrl = "http://localhost:8082/api/v1/products";
  private prodcutByCategoryIdUrl = "http://localhost:8082/api/v1/categories/";


  /**
   * Creates instance of HttpClient.
   * @param {HttpClient} http
   * @memberof ProductService
   */
  constructor(private http: HttpClient) { }


  /**
   * This method used to load products based on category-id, offset and size.
   *
   * @param {number} offset Refer to page number.
   * @param {number} size Refer to number of records per page.
   * @returns {Observable<ProductListResponse>}
   * @memberof ProductService
   */
  getProducts(categoryId: number, offset: number, size: number): Observable<ProductListResponse> {
    const params = new HttpParams().
      set('offset', offset.toString()).
      set('limit', size.toString());
    const url = `${this.prodcutByCategoryIdUrl}/${categoryId}/products`;
    return this.http
      .get<ProductListResponse>(url, { params: params });
  }

}
