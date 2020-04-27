import { Injectable } from '@angular/core';
import { EntityTag } from '../domain/entity-tag.domain';

@Injectable({
  providedIn: 'root'
})
export class AnnotationDataService {
  __lines: string[] = [];
  data: any[] = [];
  __entityTags: EntityTag[] = [];

  constructor() { }

  set lines(val: string[]) {
    this.__lines = val;
    // TODO: parse tokens
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
    this.__entityTags.filter(entity => entity.id !== id)
  }

  editEntityTag(id: number, name: string, color: string) {
    let idx = this.__entityTags.findIndex(entity => entity.id === id)
    this.__entityTags[idx].name = name;
    this.__entityTags[idx].color = color;
  }
}
