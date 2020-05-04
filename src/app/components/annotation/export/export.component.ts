import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { VolatileComponent } from 'src/app/domain/volatile-component.domain';
import { RouterStateSnapshot } from '@angular/router';
import { UnsavedChange } from 'src/app/domain/unsaved-change.domain';

interface ExportInfo { data: any, filename: string, type: string }

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent extends VolatileComponent implements OnInit {
  
  taggedOutputTypes: string[] = ['json (spaCy)', 'csv']//, 'tsv'];
  taggedOutputType: string = this.taggedOutputTypes[0];
  untaggedOutputTypes: string[] = ['txt'];
  untaggedOutputType: string = this.untaggedOutputTypes[0];

  constructor(
    private annotatedService: AnnotationDataService,
    private snackbar: MatSnackBar,
    protected __dialog: MatDialog
  ) { 
    super(__dialog, 'Session Warning', 'You are about to leave the session. Any work may be lost upon leaving. Do you wish to continue?')
  }

  protected hasUnsavedchanges(nextState: RouterStateSnapshot): UnsavedChange {
    return new UnsavedChange(nextState.url != '/tool/annotate');
  }

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
    if (taggedInfo) {
      this.save(taggedInfo)
    }
    let untaggedInfo: ExportInfo = this.exportUntagged()
    if (untaggedInfo) {
      this.save(untaggedInfo);
    }

  }
  save(info: ExportInfo) {
    var file = new Blob([info.data], { type: info.type });
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

  exportUntagged(): ExportInfo {
    switch(this.untaggedOutputType) {
      case 'txt':
        return {
          data: this.annotatedService.getTaggedData().map(data => data.sentence).join('\n'),
          filename: 'untagged-data.txt',
          type: 'text/plain'
        }
      default:
        this.snackbar.open('Invalid untagged data export type.', 'close', {
          duration: 3000
        })
    }
  }

  exportTagged(): ExportInfo {
    switch (this.taggedOutputType) {
      case 'json (spaCy)':
        return {
          data: this.getSpacyTagged(),
          filename: 'tagged-data.json',
          type: 'text/json'
        }
      case 'csv':
        return {
          data: this.getCSVTagged(),
          filename: 'tagged-data.csv',
          type: 'text/csv'
        }
      default:
        this.snackbar.open('Invalid tagged data export type.', 'close', {
          duration: 3000
        })
    }
  }

  getSpacyTagged() {
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

  getCSVTagged() {
    let output = this.getTokenSplit()
      .map(line => line
        .map(col => `"${col.replace('"', '""')}"`)
        .join(','))
      .join('\n');
    return output;
  }

  getTokenSplit(): string[][] {
    let output: string[][] = [];

    this.annotatedService.finisedTagged.forEach((data, index) => {
      let startIndex = 0;
      for (let token of data.sentence.split(' ')) {
        let entities = data.entities.filter(entity => entity.start <= startIndex && entity.end > startIndex)
        let line = [
          startIndex == 0 ? `Senetence: ${index + 1}` : '',
          token,
          (entities.length > 0) ? entities[0].tag.name : 'O'
        ]
        output.push(line);
        startIndex += (token.length + 1)
      }
    })
    return output;
  }


}
