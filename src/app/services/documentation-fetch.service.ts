import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableOfContents } from '../domain/table-of-contents.domain';

@Injectable({
  providedIn: 'root'
})
export class DocumentationFetchService {

  constructor(
    private http: HttpClient
  ) { }

  get tableOfContents(): Observable<TableOfContents> {
    return this.http.get<TableOfContents>("assets/documentation/contents.json")
  }
}
