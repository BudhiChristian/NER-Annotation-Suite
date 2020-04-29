import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { EntityTag } from 'src/app/domain/entity-tag.domain';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditTagComponent } from './edit-tag/edit-tag.component';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit {
  tagNameInput: string = '';
  colorInput: string = '#ffffff';

  constructor(
    private annotationService: AnnotationDataService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
    if (!this.tagNameInput) {
      this.snackbar.open('Entity Tag name cannot be empty.', 'close', {
        duration: 3000
      })
    } else if (this.entityTags.filter(e => e.name == this.tagNameInput).length > 0) {
      this.snackbar.open('Entity Tag already exists.', 'close', {
        duration: 3000
      })
    } else {
      this.annotationService.addEntityTag(this.tagNameInput.trim(), this.colorInput);
      this.setRandomColor();
      this.tagNameInput = '';
    }
  }
  
  removeEntity(entity: EntityTag) {
    this.annotationService.removeEntityTag(entity.id)
  }

  editEntity(entity: EntityTag) {
    this.dialog.open(EditTagComponent, {
      data: entity,
      autoFocus: false,
      restoreFocus: false,
      width: '550px'
    }).afterClosed().subscribe(res => {
      if(res) {
        entity.name = res.tagNameInput.trim()
        entity.color = res.colorInput
      }
    })
  }

  get entityTags(): EntityTag[] {
    return this.annotationService.entityTags;
  }

}
