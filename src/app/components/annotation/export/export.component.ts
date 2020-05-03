import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { MatSnackBar } from '@angular/material';

interface ExportInfo { data: any, filename: string, type: string }

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  taggedOutputTypes: string[] = ['json (spaCy)'] //, 'csv', 'tsv'];
  taggedOutputType: string = this.taggedOutputTypes[0];
  untaggedOutputTypes: string[] = ['txt'];
  untaggedOutputType: string = this.untaggedOutputTypes[0];

  constructor(
    private annotatedService: AnnotationDataService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  get numTagged(): number {
    return this.annotatedService.finisedTagged.length;
  }

  get numUntagged(): number {
    return this.annotatedService.getTaggedData().length;
  }

  export() {
    let taggedInfo: ExportInfo = this.exportTagged()
    if(taggedInfo) {
      this.save(taggedInfo)
    }

  }
  save(info: ExportInfo) {
    var file = new Blob([info.data], {type: info.type});
    let a = document.createElement('a');
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = info.filename,
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  exportTagged(): ExportInfo{
    switch (this.taggedOutputType) {
      case 'json (spaCy)':
        return {
          data: this.exportTaggedSpacy(),
          filename: 'tagged-data.json',
          type: 'text/json'
        }
      default:
        this.snackbar.open('Invalid tagged data export type.', 'close', {
          duration: 3000
        })
    }
  }

  exportTaggedSpacy() {
    let output = this.annotatedService.finisedTagged.map(data => ({
      content: data.sentence,
      annotation: data.entities.map(entity => ({
        label: [entity.tag.name],
        points: [{
          text: entity.text,
          start: entity.start,
          end: entity.end
        }]
      }))
    }))
    return JSON.stringify(output, null, 4)
  }

}
