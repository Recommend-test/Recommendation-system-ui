import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailGuardGuard implements CanActivate {

  constructor(private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let id=+next.paramMap.get('id');
    if(isNaN(id)||id<1){
      alert('invalid id ');
      this.router.navigate(['/products']);
      return false;
    }
     
    return true;
  }
  
}
