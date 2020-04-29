import { Component, OnInit, Input } from '@angular/core';
import { TaggedData } from 'src/app/domain/tagged-data.domain';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  constructor(
    private annotationService: AnnotationDataService
  ) { 
  }

  ngOnInit() {
  }

  get currentData(): TaggedData {
    let fullData = this.annotationService.getTaggedData();
    if (fullData.length > 0) {
      return fullData[0];
    }
    return undefined;
  }
  
  getSelected() {
    let selected = window.getSelection()
    console.log(selected)
    let press = Number(selected.anchorNode.parentElement.id.slice(5));
    let release = Number(selected.focusNode.parentElement.id.slice(5));
    console.log(press)
    console.log(release)
    console.log(selected.toString())
    console.log(this.currentData.sentence.slice(Math.min(press, release), Math.max(press, release)+1))
  }

  sentenceToList(sentence: string) {
    return [...sentence]
  }

}
