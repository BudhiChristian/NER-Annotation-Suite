import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {

  constructor(
    private annotationService: AnnotationDataService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.annotationService.reset();
  }

}
