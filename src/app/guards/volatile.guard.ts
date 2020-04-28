import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { VolatileComponent } from '../domain/volatile-component.domain';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VolatileGuard implements CanDeactivate<VolatileComponent> {
    constructor() { }

    canDeactivate(
        component: VolatileComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ) {
        if (!component.canDeactivate) {
            // canDeactivate is not implemented
            return of(true);
        }

        return component.canDeactivate(nextState)
    }
}