import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/Product';

@Injectable({
    providedIn: "root"
})
export class ProductDataService {
    private sharedProduct = new BehaviorSubject<Product>(new Product());
    public productObservable = this.sharedProduct.asObservable();
    private sharedCategoryId = new BehaviorSubject<number>(0);
    public categoryIdObservable = this.sharedCategoryId.asObservable();

    constructor() { }

    updateProduct(product: Product) {
        this.sharedProduct.next(product);
    }

    updateCategoryId(categoryId: number) {
        this.sharedCategoryId.next(categoryId);
    }


}