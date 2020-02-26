import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserActionManipulationComponent } from '../user-action-manipulation/user-action-manipulation.component';
import { AppConstants } from 'src/app/utility/AppConstants';


@Injectable({
  providedIn: 'root'
})
export class UserActionManipulationGuard implements CanDeactivate<UserActionManipulationComponent> {



  /**
   *
   *
   * @param {UserActionManipulationComponent} component
   * @param {ActivatedRouteSnapshot} currentRoute
   * @param {RouterStateSnapshot} currentState
   * @param {RouterStateSnapshot} [nextState]
   * @returns {(boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>)}
   * @memberof UserActionManipulationGuard
   */
  canDeactivate(component: UserActionManipulationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (component.userActionForm.dirty) {
      return confirm(AppConstants.loseData);
    }
    return true;
  }
}
