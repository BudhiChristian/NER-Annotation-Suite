import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnotationDataService } from '../services/annotation-data.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private annotationService: AnnotationDataService,
    private snackbar: MatSnackBar
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
        case '/tool/export':
          if(!this.annotationService.setupTouched) {
            this.router.navigate(['/tool'])
            return false;
          } else if(this.annotationService.finisedTagged.length < 1) {
            this.router.navigate(['/tool/annotate'])
            this.snackbar.open('No data ready for export.', 'close', {
              duration: 3000
            })
            return false;
          } else {
            return true;
          }
        default:
          return true;
      }
  }

}
