import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/utility/AppConstants';
import { ProductManipulationComponent } from '../product-manipulation/product-manipulation.component';


@Injectable({
  providedIn: 'root'
})
export class ProductManipulationGuardGuard implements CanDeactivate<ProductManipulationComponent> {


  /**
   * This method used to pop message if user want to back without save data in add or edit screen.
   *
   * @param {ProductManipulationComponent} component
   * @param {ActivatedRouteSnapshot} currentRoute
   * @param {RouterStateSnapshot} currentState
   * @param {RouterStateSnapshot} [nextState]
   * @returns {(boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>)}
   * @memberof CategoryManipulationGuard
   */
  canDeactivate(component: ProductManipulationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.productForm.dirty) {
      return confirm(AppConstants.loseData);
    }
    return true;
  }
}
