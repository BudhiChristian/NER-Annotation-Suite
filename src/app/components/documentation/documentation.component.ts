import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  section: string = ''
  private __subscribers: Subscription[] = [];
  constructor(
    private route: ActivatedRoute
  ) {
    this.__subscribers.push(this.route.paramMap.subscribe(params => {
      this.section = params.get('section') || 'introduction'
    }))
  }

  ngOnDestroy() {
    this.__subscribers.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
  }

}
