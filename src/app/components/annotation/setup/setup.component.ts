import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public readonly INPUT_TYPES: string[] = ['Start Empty', 'TXT File'];
  public inputType: string = this.INPUT_TYPES[0];

  constructor(
    private annotationService: AnnotationDataService
  ) { }

  ngOnInit() {
  }

  set lines(val: string[]) {
    this.annotationService.lines = val;
  }
  get lines(): string[] {
    return this.annotationService.lines;
  }

}
