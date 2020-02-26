import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryManipulationComponent } from '../category-manipulation/category-manipulation.component';
import { AppConstants } from 'src/app/utility/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class CategoryManipulationGuard implements CanDeactivate<CategoryManipulationComponent> {


  /**
   * This method used to pop message if user want to back without save data in add or edit screen.
   *
   * @param {CategoryManipulationComponent} component
   * @param {ActivatedRouteSnapshot} currentRoute
   * @param {RouterStateSnapshot} currentState
   * @param {RouterStateSnapshot} [nextState]
   * @returns {(boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>)}
   * @memberof CategoryManipulationGuard
   */
  canDeactivate(component: CategoryManipulationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.categoryForm.dirty) {
      return confirm(AppConstants.loseData);
    }
    return true;
  }
}
