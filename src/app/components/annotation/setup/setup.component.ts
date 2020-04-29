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
    super(__dialog, 'Changes Detected',
      'Changes have been detected in the setup form. Leaving this page will result in lost work. Do you wish to continue?');
    this.annotationService.touchSetup();
  }

  protected hasUnsavedchanges(nextState: RouterStateSnapshot): UnsavedChange {
    if (this.inputType == this.INPUT_TYPES[0] && this.annotationService.entityTags.length < 1) {
      return new UnsavedChange(false);
    }

    if (nextState.url == '/tool/annotate') {
      if(this.lines.length > 0) {
        return new UnsavedChange(false);
      } else {
        return new UnsavedChange(true, {
          customTitle: 'Form Incomplete',
          customMessage: 'Setup form is incomplete. Continuing to the annotation phase will result in an empty list of sentences to annotate from the start. Do you wish to continue?'
        })
      }
    }
    
    return new UnsavedChange(true);
  }

  ngOnInit() {
  }

  set lines(val: string[]) {
    this.annotationService.lines = val;
  }
  get lines(): string[] {
    return this.annotationService.lines;
  }

}
