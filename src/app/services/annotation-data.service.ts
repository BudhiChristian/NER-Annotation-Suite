import { Injectable } from '@angular/core';
import { EntityTag } from '../domain/entity-tag.domain';
import { TaggedData } from '../domain/tagged-data.domain';

@Injectable({
  providedIn: 'root'
})
export class AnnotationDataService {
  private __lines: string[] = [];
  data: any[] = [];
  private __entityTags: EntityTag[] = [];
  private __taggedData: TaggedData[] = [];

  constructor() { }

  set lines(val: string[]) {
    this.__lines = val;
    this.__taggedData = val.map(line => { return new TaggedData(line)})
  }

  getTaggedData(showTouched?: boolean): TaggedData[] {
    if (showTouched) {
      return this.__taggedData;
    }
    return this.__taggedData.filter(d => !d.touched);
  }

  get lines(): string[] {
    return this.__lines
  }

  get entityTags(): EntityTag[] {
    return this.__entityTags;
  }

  addEntityTag(name: string, color: string) {
    this.__entityTags.push(new EntityTag(name, color));
  }

  removeEntityTag(id: number) {
    this.__entityTags = this.__entityTags.filter(entity => entity.id !== id)
  }
}
