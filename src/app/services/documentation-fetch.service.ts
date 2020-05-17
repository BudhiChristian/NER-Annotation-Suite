import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableOfContents } from '../domain/table-of-contents.domain';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentationFetchService {
  private readonly base = environment.documentation.base;
  private readonly toc = environment.documentation.tableOfContents;

  private __showLoader: boolean = true;
  private __tableOfContents: TableOfContents;

  constructor(
    private http: HttpClient
  ) { }

  initialize(): Observable<TableOfContents> {
    this.__showLoader = true;
    return this.http.get<TableOfContents>(this.base+this.toc)
      .pipe(finalize(() => {
        this.__showLoader = false;
      }), tap((toc: TableOfContents) => {
        this.__tableOfContents = toc;
      }));
  }

  get showLoader(): boolean {
    return this.__showLoader;
  }

  get tableOfContents(): TableOfContents {
    return this.__tableOfContents;
  }

  getSectionUrl(section: string): string {
    return this.base + this.tableOfContents.details[section].url
  }
}
