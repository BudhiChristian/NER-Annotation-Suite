import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentationFetchService } from 'src/app/services/documentation-fetch.service';
import { TableOfContents } from 'src/app/domain/table-of-contents.domain';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentationComponent implements OnInit {
  section: string = '';
  sectionUrl: string = 'assets/documentation/sections/not-found.md';

  private __subscribers: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private documentation: DocumentationFetchService
  ) { }

  ngOnInit() {
    this.documentation.initialize().subscribe(_ => {
      this.__subscribers.push(this.route.paramMap.subscribe(params => {
        const param = params.get('section') || 'introduction';
        if(this.tableOfContents.sections.includes(param)) {
          this.section = param
          this.sectionUrl = this.tableOfContents.details[param].url;
        } else {
          this.section = 'not-found'
          this.sectionUrl = 'assets/documentation/sections/not-found.md';
        }
      }))
    })
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
