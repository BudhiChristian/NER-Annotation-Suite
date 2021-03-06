import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { VolatileComponent } from 'src/app/domain/volatile-component.domain';
import { MatDialog } from '@angular/material';
import { RouterStateSnapshot } from '@angular/router';
import { UnsavedChange } from 'src/app/domain/unsaved-change.domain';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent extends VolatileComponent implements OnInit {
  public readonly INPUT_TYPES: string[] = ['Start Empty', 'TXT File'];
  public inputType: string = this.INPUT_TYPES[0];

  constructor(
    private annotationService: AnnotationDataService,
    protected __dialog: MatDialog
  ) {
    super(__dialog, 'Session Warning',
      'Leaving this page will result in lost work. Do you wish to continue?');
    this.annotationService.touchSetup();
  }

  protected hasUnsavedchanges(nextState: RouterStateSnapshot): UnsavedChange {
    if (nextState.url == '/tool/annotate') {
      switch(this.inputType){
        case this.INPUT_TYPES[0]:
          return new UnsavedChange(false);
        default:
          return new UnsavedChange(this.lines.length < 1, {
          customTitle: 'Form Incomplete',
          customMessage: 'Setup form is incomplete. Continuing to the annotation phase will result in an empty list of sentences to annotate from the start. Do you wish to continue?'
        })
      }
    } else {
      return new UnsavedChange(this.inputType != this.INPUT_TYPES[0] || this.annotationService.entityTags.length > 0)
    }
  }

  ngOnInit() {
  }
  
  get lines(): string[] {
    return this.annotationService.lines;
  }
  set lines(val: string[]) {
    this.annotationService.lines = val;
  }
  
  get snapToToken(): boolean {
    return this.annotationService.snapToToken;
  }
  set snapToToken(val: boolean) {
    this.annotationService.snapToToken = val;
  }
}
