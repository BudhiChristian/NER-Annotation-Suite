import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntityTag } from 'src/app/domain/entity-tag.domain';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit {
  tagNameInput: string;
  colorInput: string;

  constructor(
    public dialogRef: MatDialogRef<EditTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EntityTag
  ) { 
    this.tagNameInput = data.name;
    this.colorInput = data.color;
  }

  ngOnInit() {
  }

  send() {
    this.dialogRef.close({
      tagNameInput: this.tagNameInput,
      colorInput: this.colorInput
    })
  }

}
