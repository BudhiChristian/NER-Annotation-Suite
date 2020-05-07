import { Component, OnInit, IterableDiffers, KeyValueDiffers } from '@angular/core';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { EntityTag } from 'src/app/domain/entity-tag.domain';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationModalComponent } from 'src/app/components/utils/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  start: number = NaN;
  end: number = NaN;
  sub: string = undefined;
  entityTag: EntityTag;
  styles: any[] = [];
  previousSentence: number = -1;

  __entityTagListChanges: Subscription;

  constructor(
    private annotationService: AnnotationDataService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  private reset() {
    this.start = NaN;
    this.end = NaN;
    this.sub = undefined;
  }

  ngOnInit() {
    if(this.currentData) {
      this.previousSentence = this.annotationService.getTaggedData(true).indexOf(this.currentData) - 1;
    } else {
      this.previousSentence = this.annotationService.getTaggedData(true).length - 1;
    }
    
    this.setStyle();
    this.__entityTagListChanges = this.annotationService.entityTagChanges.subscribe(() => {
      this.setStyle();
    });
  }

  ngOnDestroy() {
    this.__entityTagListChanges.unsubscribe();
  }

  setStyle() {
    this.styles = this.currentData ? this.currentData.geStyleDict() : []
  }

  get snapToToken(): boolean {
    return this.annotationService.snapToToken;
  }
  set snapToToken(val: boolean) {
    this.annotationService.snapToToken = val;
  }

  get entityTags(): EntityTag[] {
    return this.annotationService.entityTags;
  }

  get currentData(): TaggedData {
    let fullData = this.annotationService.getTaggedData();
    if (fullData.length > 0) {
      return fullData[0];
    }
    return undefined;
  }

  get hasTagged(): boolean {
    return this.annotationService.finisedTagged.length > 0;
  }

  next() {
    this.previousSentence = this.annotationService.getTaggedData(true).indexOf(this.currentData);
    this.currentData.touch();
    this.reset();
    this.setStyle();
  }

  previous() {
    this.annotationService.getTaggedData(true)[this.previousSentence].untouch();
    this.previousSentence--;
    this.reset();
    this.setStyle()
  }

  addEntity() {
    this.currentData.addEntity(this.entityTag, this.start, this.end, this.sub)
    this.reset();
    this.setStyle();
  }

  get hasSelected(): boolean {
    return !isNaN(this.start) && !isNaN(this.end)
  }

  getSelected() {
    let selected = window.getSelection()
    let press = Number(selected.anchorNode.parentElement.id.slice(5));
    let release = Number(selected.focusNode.parentElement.id.slice(5));

    let sentence = this.currentData.sentence;
    this.start = this.snapNearestToken(sentence, Math.min(press, release), true);
    this.end = this.snapNearestToken(sentence, Math.max(press, release), false) + 1
    if (this.hasSelected) {
      this.sub = sentence.slice(this.start, this.end);
    }
  }

  private snapNearestToken(sentence: string, index: number, isStart) {
    if(isNaN(index) || !this.snapToToken) {
      return index;
    }
    let c = sentence[index];
    if (!c.trim()) {
      while (index < sentence.length - 1 && index > 0&& !c.trim()) {
        index += (isStart ? 1 : -1);
        c = sentence[index]
      }
    } else {
      while (index < sentence.length - 1 && index > 0 && c.trim()) {
        index += (isStart ? -1 : 1);
        c = sentence[index]
      }
      if (!c.trim()) {
        index += (isStart ? 1 : -1);
      }
    }

    return index;
  }

  sentenceToList(sentence: string) {
    let arr = []
    for (let i = 0; i < sentence.length; i++) {
      arr.push(sentence.charAt(i))
    }
    return arr;
  }


  finishSession() {
    if(this.currentData) {
      this.dialog.open(ConfirmationModalComponent, {
        width: '300px',
        autoFocus: false,
        restoreFocus: false,
        data: {
          title: "Stage Not Empty",
          message: "There appears to be a sentence on the annotation stage. Do you wish to include this as annoted data? If not the staged sentence will be marked as unannotated.",
          confirm: "Yes",
          cancel: "No"
        }
      }).afterClosed().subscribe(res => {
        if(typeof res !== "boolean") {
          return
        }
        if(res) {
          this.currentData.touch()
        }
        this.router.navigate(['/tool', 'export'])
      })
    } else {
      this.router.navigate(['/tool', 'export'])
    }
  }
}
