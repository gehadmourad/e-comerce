import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate{
  adminPages: string[] = ['adminview', 'AddCategory', 'EditCategory'];

userPages: string[] = ['userview'];
  user!: string | null;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger
      this.user = localStorage.getItem('currentUserrole');
      if ((state.url.includes('/adminview') || state.url.includes('/AddCategory')||
      state.url.includes('/EditCategory'))&& this.user=='1') {
        this.router.navigate(['']);
  
      }
      if ((state.url.includes('/userview'))&& this.user=='2') {
        this.router.navigate(['']);
  
      }
   if (this.checkRoutingRolePermission(state) == false) {
      this.router.navigate(['forbiddenPage'], { skipLocationChange: true });
      return false;

    }
    return true;
  }

  checkRoutingRolePermission(state: RouterStateSnapshot): boolean {
   
debugger

    let urlSegments: string[] = state.url.split('/');
    // //let index: number = urlSegments.length - 1;
    let lastRoute = urlSegments[1];
     let lastpageRoutingName = lastRoute;
    // if (lastRoute.includes(";"))
    //   lastpageRoutingName = lastRoute.split(";")[0];

    // if (lastpageRoutingName == "login")
    //   return true;

  
    if (this.user == '2') {
      if (this.adminPages.indexOf(lastpageRoutingName) > -1 )
        return true;
    } else if (this.user == '1') {
      if (this.userPages.indexOf(lastpageRoutingName) > -1 )
        return true;
    }
   
    else if (this.user == '3') {
       
        return false;
      
    }


    return false;
  }
}
