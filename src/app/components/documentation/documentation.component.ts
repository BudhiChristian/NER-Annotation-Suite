import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentationFetchService } from 'src/app/services/documentation-fetch.service';
import { TableOfContents } from 'src/app/domain/table-of-contents.domain';
import { FragmentFormatPipe } from 'src/app/pipes/fragment-format.pipe';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentationComponent implements OnInit {
  activeSection: string = '';
  sectionUrl: string = 'assets/documentation/sections/loading.md';

  private fragmentPipe: FragmentFormatPipe = new FragmentFormatPipe()
  private __subscribers: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private documentation: DocumentationFetchService
  ) { }

  ngOnInit() {
    this.documentation.initialize().subscribe(_ => {
      this.__subscribers.push(this.route.paramMap.subscribe(params => {
        const param = params.get('section') || 'introduction';
        if (this.tableOfContents.sections.includes(param)) {
          this.activeSection = param
          this.sectionUrl = this.tableOfContents.details[param].url;
        } else {
          this.activeSection = 'not-found'
          this.sectionUrl = 'assets/documentation/sections/not-found.md';
        }
      }))
    })
  }

  scrollToFragment(frag: string) {
    if (frag) {
      const elem = document.getElementById(this.fragmentPipe.transform(frag))
      if (elem) {
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start'
        })
      }
    }
  }

  handleDocumentLoad() {
    let frag = this.route.snapshot.fragment
    this.scrollToFragment(frag)
  }

  handleSectionSelect(section) {
    this.scrollToFragment('top')
    let elem = this.getSectionSubMenu(section)
    if (elem) {
      elem.style.display = 'flex'
    }
  }

  handleCollapse(section) {
    let elem = this.getSectionSubMenu(section)
    if (elem) {
      if (elem.style.display == 'none') {
        elem.style.display = 'flex'
      } else {
        elem.style.display = 'none'
      }

    }
  }

  getSectionSubMenu(section) {
    return document.getElementById(section + "-sub")
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
