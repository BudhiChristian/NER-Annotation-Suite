import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableOfContents } from '../domain/table-of-contents.domain';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentationFetchService {
  private __showLoader: boolean = true;
  private __tableOfContents: TableOfContents;

  constructor(
    private http: HttpClient
  ) { 
    this.__showLoader = true;
    this.http.get<TableOfContents>("assets/documentation/contents.json")
      .pipe(finalize(() => {
        this.__showLoader = false;
      })).subscribe((toc: TableOfContents) => {
        this.__tableOfContents = toc;
      })
  }

  get showLoader(): boolean {
    return this.__showLoader;
  }

  get tableOfContents(): TableOfContents {
    return this.__tableOfContents;
  }

  getSection(section: string): Observable<any> {
    this.__showLoader = true;
    const url = this.__tableOfContents.details[section].url;
    return this.http.get<any>(url).pipe(finalize(() => {
      this.__showLoader = false;
    }))
  }
}
