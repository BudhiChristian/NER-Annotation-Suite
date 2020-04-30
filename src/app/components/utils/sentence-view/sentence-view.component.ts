import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sentence-view',
  templateUrl: './sentence-view.component.html',
  styleUrls: ['./sentence-view.component.scss']
})
export class SentenceViewComponent implements OnInit {
  remaining: number = 0;
  newSentence: string = '';
  constructor(
    private annotationService: AnnotationDataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  get data(): TaggedData[] {
    let fullData = this.annotationService.getTaggedData()
    this.remaining = Math.max(fullData.length - 10, 0);
    return fullData.slice(0, 10);
  }

  addSentence() {
    this.newSentence = this.newSentence.trim()
    if (!this.newSentence) {
      this.snackbar.open('Sentence cannot be empty.', 'close', {
        duration: 3000
      })
    } else if (this.annotationService.lines.includes(this.newSentence)) {
      this.snackbar.open('Sentence already exists in the training set.', 'close', {
        duration: 3000
      })
    } else {
      this.annotationService.addLine(this.newSentence);
      this.newSentence = '';
    }
  }
}
