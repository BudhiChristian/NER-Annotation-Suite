import { Component, OnInit, Input, IterableDiffers } from '@angular/core';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { EntityTag } from 'src/app/domain/entity-tag.domain';

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
  styles: any [] = [];

  constructor(
    private annotationService: AnnotationDataService
  ) { }

  ngOnChanges() {
    console.log('change')
  }

  ngOnInit() { 
    this.setStyle();
  }

  setStyle() {
    this.styles = this.currentData ? this.currentData.geStyleDict()  : []
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
    this.currentData.addEntity(this.entityTag, this.start, this.end, this.sub)
    this.start = NaN;
    this.end = NaN;
    this.sub = '';
    this.entityTag = undefined;
    this.setStyle();
  }

  get hasSelected(): boolean {
    return !isNaN(this.start) && !isNaN(this.end)
  }

  getSelected() {
    let selected = window.getSelection()
    let press = Number(selected.anchorNode.parentElement.id.slice(5));
    let release = Number(selected.focusNode.parentElement.id.slice(5));

    this.start = Math.min(press, release)
    this.end = Math.max(press, release)
    if (this.hasSelected) {
      this.sub = this.currentData.sentence.slice(this.start, this.end + 1);
    }
  }

  sentenceToList(sentence: string) {
    let arr = []
    for (let i = 0; i < sentence.length; i++) {
      arr.push(sentence.charAt(i))
    }
    return arr;
  }

}
