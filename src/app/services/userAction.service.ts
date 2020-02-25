import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserActionResponse } from '../model/UserActionResponse';
import { UserActionWeight } from '../model/UserActionWeight';

@Injectable()
export class UserActionService {

    
  private baseUrl = "http://localhost:8083/api/v1/actions";
  private userActionByIdUrl = "http://localhost:8083/api/v1/actions/";


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
  getActionsPage(offset : number , size : number): Observable<UserActionResponse> {
    const params = new HttpParams().
      set('offset', offset.toString()).
      set('limit', size.toString());
      const url = `${this.baseUrl}/page`;
    return this.http.get<UserActionResponse>(url, { params: params });
  }

}