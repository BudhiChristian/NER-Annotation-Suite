import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { EntityTag } from 'src/app/domain/entity-tag.domain';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit {
  colorInput: string = '#ffffff';
  tagNameInput: string = '';

  constructor(
    private annotationService: AnnotationDataService
  ) { }

  ngOnInit() {
  }

  addEntity() {
    this.annotationService.addEntityTag(this.tagNameInput, this.colorInput);
  }

  get entityTags(): EntityTag[] {
    return this.annotationService.entityTags;
  }

}
