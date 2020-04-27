import { Injectable } from '@angular/core';
import { EntityTag } from '../domain/entity-tag.domain';

@Injectable({
  providedIn: 'root'
})
export class AnnotationDataService {
  private __lines: string[] = [];
  data: any[] = [];
  private __entityTags: EntityTag[] = [];

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
    this.__entityTags = this.__entityTags.filter(entity => entity.id !== id)
  }
}
