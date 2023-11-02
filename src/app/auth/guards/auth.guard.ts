import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map, take} from "rxjs";
import {StorageService} from "../../_services/storage.service";

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.AuthenticatedUser$.pipe(
    take(1), // take the first one and then unsubscribe automatically
    map(user => {
      // check if route is restricted by role

      console.log(user)
      if(user && user.roles) {
        return true;
      }
      if(user) {
        return  router.createUrlTree(['/forbidden']);
      }
      return  router.createUrlTree(['/sign-in']);
    })
  )
};
