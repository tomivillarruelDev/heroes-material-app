
import {  ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const checkAuthStatus = () => {
  const authService = inject( AuthService );
  const router = inject( Router );

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated)),
      tap ( isAuthenticated => {
        if ( !isAuthenticated ) {
          router.navigateByUrl('/auth/login');
        }
      })
    )
}


//
export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {

  return checkAuthStatus();

};


export const canActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  return checkAuthStatus();
  ;
};

