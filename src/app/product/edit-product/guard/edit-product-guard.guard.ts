import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EditProductComponent } from '../edit-product.component';

@Injectable({
  providedIn: 'root'
})
export class EditProductGuardGuard implements CanDeactivate<EditProductComponent> {

  canDeactivate(component: EditProductComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.productForm.dirty) {
      return confirm('navigate away will lose all data');
    }
    return true;
  }


}
