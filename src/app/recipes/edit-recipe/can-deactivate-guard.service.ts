import { Observable } from "rxjs/Observable";
import { CanDeactivate } from "@angular/router/src/interfaces";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate {
    canDeavtivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeavtivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate
        , currentRoute: ActivatedRouteSnapshot
        , currentState: RouterStateSnapshot
        , nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return component.canDeavtivate();
    }
    
}