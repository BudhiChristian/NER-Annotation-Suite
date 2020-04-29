import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { SetupComponent } from './components/annotation/setup/setup.component';
import { AnnotateComponent } from './components/annotation/annotate/annotate.component';
import { ExportComponent } from './components/annotation/export/export.component';
import { VolatileGuard } from './guards/volatile.guard';
import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  }, {
    path: 'about',
    component: AboutComponent
  }, {
    path: 'tool',
    component: AnnotationComponent,
    children: [
      {
        path: 'setup',
        component: SetupComponent,
        canDeactivate: [VolatileGuard]
      },
      {
        path: 'annotate',
        component: AnnotateComponent,
        canDeactivate: [VolatileGuard],
        canActivate: [RouteGuard]
      }, {
        path: 'export',
        component: ExportComponent
      }, {
        path: '**',
        redirectTo: 'setup'
      }
    ]
  }, {
    path: 'documentation',
    component: DocumentationComponent
  }, {
    path: '**',
    redirectTo: 'about'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
