import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TagInfo } from 'src/app/domain/tag-info.domain';
import { EntityTag } from 'src/app/domain/entity-tag.domain';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss']
})
export class EditEntityComponent implements OnInit {
  sentence: string = '';
  startIndex: number = 0;
  endIndex: number = 0;
  entityTag: EntityTag = null;

  constructor(
    private annotationService: AnnotationDataService,
    public dialogRef: MatDialogRef<EditEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sentence: string, entity: TagInfo }
  ) {
    this.sentence = data.sentence;
    this.startIndex = data.entity.start;
    this.endIndex = data.entity.end;
    this.entityTag = data.entity.tag;
  }

  ngOnInit() {
  }

  get isInvalidRange(): boolean {
    return isNaN(this.startIndex) ||
      isNaN(this.endIndex) ||
      this.startIndex < 0 ||
      this.endIndex > this.sentence.length ||
      this.startIndex > this.endIndex
  }

  get entityTags(): EntityTag[] {
    return this.annotationService.entityTags;
  }

  send() {
    let response = new TagInfo(
      this.entityTag,
      this.startIndex,
      this.endIndex,
      this.sentence.slice(this.startIndex, this.endIndex)
    )
    this.dialogRef.close(response)
  }

}
