import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VolatileComponent } from 'src/app/domain/volatile-component.domain';
import { RouterStateSnapshot } from '@angular/router';
import { UnsavedChange } from 'src/app/domain/unsaved-change.domain';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss']
})
export class AnnotateComponent extends VolatileComponent implements OnInit {
  currentData: TaggedData;
  
  constructor(
    protected __dialog: MatDialog,
    private annotationService: AnnotationDataService
    ) { 
      super(__dialog, 'Session Warning','You are about to exit an annotation session. Progress may be lost. Do you wish to continue?')
    }
    
    ngOnInit() {
    }
    
    protected hasUnsavedchanges(nextState: RouterStateSnapshot): UnsavedChange {
      return new UnsavedChange(nextState.url != "/tool/export", {
        onAnswer: (confirmed) => {
          if (confirmed) {
            this.annotationService.reset();
          }
        }
      });
    }
}
