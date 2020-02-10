import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryManipulationComponent } from '../category-manipulation/category-manipulation.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryManipulationGuard implements CanDeactivate<CategoryManipulationComponent> {

  canDeactivate(component: CategoryManipulationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.categoryForm.dirty) {
      return confirm('Navigate away will lose all data');
    }
    return true;
  }
}
