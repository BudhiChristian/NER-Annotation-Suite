import { Component, OnInit, Input, IterableDiffers, Output, EventEmitter } from '@angular/core';
import { TagInfo } from 'src/app/domain/tag-info.domain';
import { MatTableDataSource } from '@angular/material';
import { TaggedData } from 'src/app/domain/tagged-data.domain';

@Component({
  selector: 'app-tagged-entity-view',
  templateUrl: './tagged-entity-view.component.html',
  styleUrls: ['./tagged-entity-view.component.scss']
})
export class TaggedEntityViewComponent implements OnInit {
  @Input() currentData: TaggedData;
  @Output() onDataChanged: EventEmitter<void> = new EventEmitter<void>();

  displayedColumns: string[] = ['text', 'start', 'end', 'tag', 'options']
  dataSource = new MatTableDataSource<TagInfo>();

  private __differ: any;

  constructor(
    private differs: IterableDiffers
  ) {
    this.__differ = this.differs.find([]).create(null);
  }
  ngOnInit() { }

  ngDoCheck() {
    const change = this.__differ.diff(this.currentData.entities);
    if (change) {
      this.dataSource.data = this.currentData.entities
    }
  }

  remove(entity: TagInfo) {
    this.currentData.removeEntity(entity.id)
    this.onDataChanged.emit();
  }

}
