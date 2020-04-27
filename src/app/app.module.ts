import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBarModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { SetupComponent } from './components/annotation/setup/setup.component';
import { AnnotateComponent } from './components/annotation/annotate/annotate.component';
import { ExportComponent } from './components/annotation/export/export.component';
import { AnnotationDataService } from './services/annotation-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TxtFileComponent } from './components/annotation/setup/txt-file/txt-file.component';
import { FakepathPipe } from './pipes/fakepath.pipe';
import { FileInputComponent } from './components/utils/file-input/file-input.component';
import { TagViewComponent } from './components/utils/tag-view/tag-view.component';
import { EditTagComponent } from './components/utils/tag-view/edit-tag/edit-tag.component';

const MATERIAL_IMPORTS = [ MatDialogModule, MatSnackBarModule, MatInputModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSelectModule, MatFormFieldModule ];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnnotationComponent,
    DocumentationComponent,
    SetupComponent,
    AnnotateComponent,
    ExportComponent,
    TxtFileComponent,
    FakepathPipe,
    FileInputComponent,
    TagViewComponent,
    EditTagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
  providers: [
    AnnotationDataService
  ],
  entryComponents: [
    EditTagComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
