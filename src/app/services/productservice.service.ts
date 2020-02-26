import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListResponse } from '../model/ProductListResponse';
import { Product } from '../model/Product';


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


  /**
   * This method used to get product by id.
   *
   * @param {string} id product id.
   * @returns {Observable<Product>}
   * @memberof ProductService
   */
  getProductById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }


  /**
   * This method used to update product
   *
   * @param {Product} product The updated product.
   * @returns {Observable<Product>}
   * @memberof ProductService
   */
  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    console.log(JSON.stringify(product));
    return this.http
      .put<Product>(this.baseUrl, product, { headers });
  }


  /**
   *
   * This method used to delete product by id.
   * @param {number} id
   * @returns {Observable<string>}
   * @memberof ProductService
   */
  deleteProduct(id: number): Observable<string> {
    const url = `${this.baseUrl}/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .delete<string>(url, { headers });
  }


  /**
   * This method used to add product.
   *
   * @param {Product} product
   * @returns {Observable<Product>}
   * @memberof ProductService
   */
  addProduct(product: Product): Observable<Product> {
    console.log(JSON.stringify(product));
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<Product>(this.baseUrl, product, { headers });
  }


}
