import { Component, OnInit, Input, IterableDiffers, Output, EventEmitter, ViewChild } from '@angular/core';
import { TagInfo } from 'src/app/domain/tag-info.domain';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { EditEntityComponent } from './edit-entity/edit-entity.component';

@Component({
  selector: 'app-tagged-entity-view',
  templateUrl: './tagged-entity-view.component.html',
  styleUrls: ['./tagged-entity-view.component.scss']
})
export class TaggedEntityViewComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() currentData: TaggedData;
  @Output() onDataChanged: EventEmitter<void> = new EventEmitter<void>();

  displayedColumns: string[] = ['text', 'start', 'end', 'tag', 'options']
  dataSource = new MatTableDataSource<TagInfo>();

  private __differ: any;

  constructor(
    private differs: IterableDiffers,
    private dialog: MatDialog
  ) {
    this.__differ = this.differs.find([]).create(null);
  }
  ngOnInit() { }

  ngDoCheck() {
    const change = this.__differ.diff(this.currentData.entities);
    if (change) {
      this.dataSource.data = this.currentData.entities
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'tag':
            return item.tag.name;
          default:
            return item[property];
        }
      }
    }
  }

  remove(entity: TagInfo) {
    this.currentData.removeEntity(entity.id)
    this.onDataChanged.emit();
  }
  edit(entity: TagInfo) {
    this.dialog.open(EditEntityComponent, {
      data: {
        sentence: this.currentData.sentence,
        entity: entity
      },
      autoFocus: false,
      restoreFocus: false,
      width: '600px'
    }).afterClosed().subscribe((res: TagInfo) => {
      if(!res) {
        return
      }
      this.currentData.editEntity(entity.id, res)
      this.onDataChanged.emit();
    })
  }

}
