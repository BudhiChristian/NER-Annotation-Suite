import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentationFetchService {

  constructor(
    private http: HttpClient
  ) { }

  get tableOfContents(): Observable<any> {
    return this.http.get<any>("assets/documentation/contents.json")
  }
}
