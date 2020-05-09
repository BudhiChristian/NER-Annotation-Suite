import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentationFetchService } from 'src/app/services/documentation-fetch.service';

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
  ) {
    this.__subscribers.push(this.route.paramMap.subscribe(params => {
      this.section = params.get('section') || 'introduction';
    }))
  }

  ngOnDestroy() {
    this.__subscribers.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.documentation.tableOfContents.subscribe(res => {
      console.log(res)
    })
  }

}
