import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserActionResponse } from '../model/UserActionResponse';
import { UserActionWeight } from '../model/UserActionWeight';

@Injectable({
  providedIn: 'root'
})
export class UserActionService {
    
  private baseUrl = "http://localhost:8083/api/v1/actions";

  constructor(private http: HttpClient) { }

  getActionsPage(offset : number , size : number): Observable<UserActionResponse> {
    const params = new HttpParams().
      set('offset', offset.toString()).
      set('limit', size.toString());
      const url = `${this.baseUrl}/page`;
    return this.http.get<UserActionResponse>(url, { params: params });
  }

   getUserActionWeightById(id: string): Observable<UserActionWeight> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<UserActionWeight>(url);
  }

  addUserActionWeight(userActionWeight: UserActionWeight): Observable<UserActionWeight> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<UserActionWeight>(this.baseUrl, userActionWeight, { headers });
  }

  updateUserActionWeight(userActionWeight: UserActionWeight): Observable<UserActionWeight> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<UserActionWeight>(this.baseUrl, userActionWeight, { headers });
  }

  deleteUserAction(id: number): Observable<string> {
    const url = `${this.baseUrl}/${id}`;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .delete<string>(url, { headers });
  }

  getAllUserActions(): Observable<UserActionWeight[]> {
    
    return this.http
      .get<UserActionWeight[]>(this.baseUrl);
  }
}