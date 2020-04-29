import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnotationDataService } from '../services/annotation-data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private annotationService: AnnotationDataService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      switch(state.url){
        case '/tool/annotate':
          if (this.annotationService.setupTouched) {
            return true;
          } else {
            this.router.navigate(['/tool']);
            return false;
          }            
        default:
          return true;
      }
  }

}
