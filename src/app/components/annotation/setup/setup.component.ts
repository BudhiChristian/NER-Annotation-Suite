import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  constructor(
    private annotationService: AnnotationDataService
  ) { }

  ngOnInit() {
  }

}
