import { inject } from "@angular/core";
import { Router, CanActivateFn, CanMatchFn } from '@angular/router';
import { map, tap } from "rxjs";

import { AuthService } from "../services/auth.service";

export const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('public Authenticated:', isAuthenticated) ),
      tap( isAuthenticated => {
          if (isAuthenticated) {
            router.navigateByUrl('/');
          }
      }),
      map( isAuthenticated => !isAuthenticated )
    )
}


export const publicCanActivatedGuard: CanActivateFn = () => {

  return checkAuthStatus();
}


export const publicCanMatchGuard: CanMatchFn = () => {


    return checkAuthStatus();
}


