import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { EntityTag } from 'src/app/domain/entity-tag.domain';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit {
  colorInput: string = '#ffffff';
  tagNameInput: string = '';

  constructor(
    private annotationService: AnnotationDataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setRandomColor();
  }

  setRandomColor() {
    let r = Math.floor(Math.random()*255).toString(16)
    r = r.length < 2 ? `0${r}` : r
    let g = Math.floor(Math.random()*255).toString(16)
    g = g.length < 2 ? `0${g}` : g
    let b = Math.floor(Math.random()*255).toString(16)
    b = b.length < 2 ? `0${b}` : b
    this.colorInput = `#${r}${g}${b}`;
  }

  addEntity() {
    this.tagNameInput = this.tagNameInput.trim();
    if (this.entityTags.filter(e => e.name == this.tagNameInput).length > 0) {
      this.snackbar.open('Entity Tag Exists.', 'close', {
        duration: 3000
      })
      return;
    }
    this.annotationService.addEntityTag(this.tagNameInput.trim(), this.colorInput);
    this.setRandomColor();
    this.tagNameInput = '';
  }
  removeEntity(entity: EntityTag) {
    this.annotationService.removeEntityTag(entity.id)
  }

  get entityTags(): EntityTag[] {
    return this.annotationService.entityTags;
  }

}
