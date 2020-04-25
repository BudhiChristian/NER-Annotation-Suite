import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { SetupComponent } from './components/annotation/setup/setup.component';
import { AnnotateComponent } from './components/annotation/annotate/annotate.component';
import { ExportComponent } from './components/annotation/export/export.component';
import { AnnotationDataService } from './services/annotation-data.service';

const MATERIAL_IMPORTS = [MatToolbarModule, MatButtonModule, MatIconModule]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnnotationComponent,
    DocumentationComponent,
    SetupComponent,
    AnnotateComponent,
    ExportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MATERIAL_IMPORTS
  ],
  providers: [
    AnnotationDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
