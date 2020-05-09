import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentationFetchService } from 'src/app/services/documentation-fetch.service';
import { TableOfContents } from 'src/app/domain/table-of-contents.domain';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  section: string = '';

  private __subscribers: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private documentation: DocumentationFetchService
  ) { }

  ngOnInit() {
    this.__subscribers.push(this.route.paramMap.subscribe(params => {
      this.section = params.get('section') || 'introduction';
      console.log(this.section)
    }))
  }

  ngOnDestroy() {
    this.__subscribers.forEach(sub => sub.unsubscribe());
  }

  get loading(): boolean {
    return this.documentation.showLoader;
  }

  get tableOfContents(): TableOfContents {
    return this.documentation.tableOfContents;
  }

}
