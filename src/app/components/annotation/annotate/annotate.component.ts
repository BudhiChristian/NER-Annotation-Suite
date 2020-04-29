import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VolatileComponent } from 'src/app/domain/volatile-component.domain';
import { RouterStateSnapshot } from '@angular/router';
import { UnsavedChange } from 'src/app/domain/unsaved-change.domain';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.scss']
})
export class AnnotateComponent extends VolatileComponent implements OnInit {
  
  constructor(
    protected __dialog: MatDialog
    ) { 
      super(__dialog, 'Session Warning','You are about to exit an annotation session. Progress may be lost. Do you wish to continue?')
    }
    
    ngOnInit() {
    }
    
    protected hasUnsavedchanges(nextState: RouterStateSnapshot): UnsavedChange {
      return new UnsavedChange(nextState.url != "/tool/export");
    }
}
