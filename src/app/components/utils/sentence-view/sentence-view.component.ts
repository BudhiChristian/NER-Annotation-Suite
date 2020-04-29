import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { TaggedData } from 'src/app/domain/tagged-data.domain';

@Component({
  selector: 'app-sentence-view',
  templateUrl: './sentence-view.component.html',
  styleUrls: ['./sentence-view.component.scss']
})
export class SentenceViewComponent implements OnInit {
  @Output('selectedData') selectData: EventEmitter<TaggedData> = new EventEmitter<TaggedData>();

  constructor(
    private annotationService: AnnotationDataService
  ) { }

  ngOnInit() {
  }
  remaining: number = 0;
  get data(): TaggedData[] {
    let fullData = this.annotationService.getTaggedData()
    this.remaining = Math.max(fullData.length-1, 0);
    return fullData.slice(0, 100);
  }
}
