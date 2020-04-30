import { Component, OnInit, Input, IterableDiffers } from '@angular/core';
import { TagInfo } from 'src/app/domain/tag-info.domain';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tagged-entity-view',
  templateUrl: './tagged-entity-view.component.html',
  styleUrls: ['./tagged-entity-view.component.scss']
})
export class TaggedEntityViewComponent implements OnInit  {
  @Input() entities: TagInfo[];

  displayedColumns: string[] = ['text', 'start', 'end', 'tag']
  displayBasic: string[] = ['text', 'start', 'end']
  dataSource = new MatTableDataSource<TagInfo>();

  private __differ: any;

  constructor(differs: IterableDiffers) { 
    this.__differ = differs.find([]).create(null);
  }
  ngOnInit() { }

  ngDoCheck() {
    const change = this.__differ.diff(this.entities);
    if(change) {
      this.dataSource.data = this.entities
    }
  }


}
