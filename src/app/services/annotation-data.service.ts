import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnotationDataService {
  __lines: string[] = [];
  data: any[] = [];

  constructor() { }

  set lines(val: string[]) {
    this.__lines = val;
    // TODO: parse tokens
  }
  get lines(): string[] {
    return this.__lines
  }
}
