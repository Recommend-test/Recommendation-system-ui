import { Injectable } from "@angular/core";
import { Iproduct } from "../product/product-list/product";
import {
  HttpClientModule,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductserviceService {
  private productsUrl = "http://localhost:8080/product/products";
  private productIdUrl = "http://localhost:8080/product/products/";
  private updateProductUrl = "http://localhost:8080/product/products/update";
  private deleteProductUrl = "http://localhost:8080/product/products/delete";
  private productsSizeUrl = "http://localhost:8080/product/products/size";

  constructor(private http: HttpClient) { }

  getProducts(offset: number, size: number): Observable<Iproduct[]> {
    let url = `${this.productsUrl}/${offset}/${size}`;
    return this.http
      .get<Iproduct[]>(url)
      .pipe(tap(this.handleData), catchError(this.handleError));
  }

  getProductsSize(): Observable<number> {
    return this.http.get<number>(this.productsSizeUrl);
  }

  getProductById(id: string): Observable<Iproduct> {
    const url = `${this.productIdUrl}/${id}`;
    return this.http.get<Iproduct>(url);
  }

  updateProduct(product: Iproduct): Observable<Iproduct> {
    const url = this.updateProductUrl;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Iproduct>(url, product, { headers })
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
  private handleData(data: Iproduct[]) {
    // data[0].productCode='MyProduct';
    // console.log(JSON.stringify(data));
  }

  //catch error
  private handleError(err: HttpErrorResponse) {
    return throwError(err);
  }
}
