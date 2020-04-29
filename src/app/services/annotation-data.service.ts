import { Injectable } from '@angular/core';
import { EntityTag } from '../domain/entity-tag.domain';
import { TaggedData } from '../domain/tagged-data.domain';

@Injectable({
  providedIn: 'root'
})
export class AnnotationDataService {
  private __setupTouched: boolean = false;
  private __lines: string[] = [];
  private __entityTags: EntityTag[] = [];
  private __taggedData: TaggedData[] = [];

  constructor() { }
  reset() {
    this.__setupTouched = false;
    this.__lines = [];
    this.__entityTags = [];
    this.__taggedData = [];
  }

  get setupTouched(): boolean {
    return this.__setupTouched;
  }

  touchSetup() {
    this.__setupTouched = true;
  }

  getTaggedData(showTouched?: boolean): TaggedData[] {
    if (showTouched) {
      return this.__taggedData;
    }
    return this.__taggedData.filter(d => !d.touched);
  }

  set lines(val: string[]) {
    this.__lines = val;
    this.__taggedData = val.map(line => new TaggedData(line));
  }

  get lines(): string[] {
    return this.__lines
  }

  addLine(line: string) {
    this.__lines.push(line);
    this.__taggedData.push(new TaggedData(line));
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
