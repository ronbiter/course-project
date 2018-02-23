import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth.service";
import { CanActivateChild } from "@angular/router/src/interfaces";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot
                ,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthenticated()
                    .then(
                        (authenticated: boolean) => {
                            if (authenticated) {
                                return true;
                            } else {
                                this.router.navigate(['/']);
                            }
                        }
                    )
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot
                        ,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

}