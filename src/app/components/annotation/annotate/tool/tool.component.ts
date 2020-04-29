import { Component, OnInit, Input } from '@angular/core';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { EntityTag } from 'src/app/domain/entity-tag.domain';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  start: number;
  end: number;
  sub: string;
  entityTag: EntityTag;

  constructor(
    private annotationService: AnnotationDataService
  ) { 
  }

  ngOnInit() {
    
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

  addEntity() {
    this.currentData.addEntity(this.entityTag, this.start, this.end)
    this.start = undefined;
    this.end = undefined;
    this.sub = '';
    this.entityTag = undefined;
  }

  
  getSelected() {
    let selected = window.getSelection()
    let press = Number(selected.anchorNode.parentElement.id.slice(5));
    let release = Number(selected.focusNode.parentElement.id.slice(5));

    this.start = Math.min(press, release)
    this.end = Math.max(press, release)+1
    if(this.start && this.end) {
      this.sub = this.currentData.sentence.slice(this.start, this.end);
    }
  }

  sentenceToList(sentence: string)  {
    return [...sentence]
  }

}
