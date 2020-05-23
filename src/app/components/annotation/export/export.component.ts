import { Component, OnInit } from '@angular/core';
import { AnnotationDataService } from 'src/app/services/annotation-data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { VolatileComponent } from 'src/app/domain/volatile-component.domain';
import { RouterStateSnapshot } from '@angular/router';
import { UnsavedChange } from 'src/app/domain/unsaved-change.domain';
import { Papa } from 'ngx-papaparse'
import { positionalTagOptions, getPositionalTagFormat } from './export.utility';

interface ExportInfo { data: any, filename: string, type: string }

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent extends VolatileComponent implements OnInit {
  saveTagged: boolean = true;
  readonly taggedOutputTypes: string[] = ['json', 'csv'];
  taggedOutputType: string = this.taggedOutputTypes[0];
  appendToExisting: boolean = false;
  appendData: any;
  readonly additionalTaggingTypes: string[] = positionalTagOptions
  additionalTaggingType:string = this.additionalTaggingTypes[0];

  saveUntagged: boolean = true;
  readonly untaggedOutputTypes: string[] = ['txt'];
  untaggedOutputType: string = this.untaggedOutputTypes[0];

  constructor(
    private annotatedService: AnnotationDataService,
    private snackbar: MatSnackBar,
    protected __dialog: MatDialog,
    private papa: Papa
  ) {
    super(__dialog, 'Session Warning', 'You are about to leave the session. Any work may be lost upon leaving. Do you wish to continue?')
  }
  
  get canExport(): boolean {
    if (this.saveTagged) {
      return !this.appendToExisting || Boolean(this.appendData)
    } 
    return this.saveUntagged
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
    if (this.saveTagged) {
      let taggedInfo: ExportInfo = this.exportTagged()
      if (taggedInfo) {
        this.save(taggedInfo)
      }
    }
    if (this.saveUntagged) {
      let untaggedInfo: ExportInfo = this.exportUntagged()
      if (untaggedInfo) {
        this.save(untaggedInfo);
      }
    }

  }
  private save(info: ExportInfo) {
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

  private exportUntagged(): ExportInfo {
    switch (this.untaggedOutputType) {
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

  private exportTagged(): ExportInfo {
    switch (this.taggedOutputType) {
      case 'json':
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

  private getSpacyTagged() {
    let output = this.annotatedService.finisedTagged.map(data =>{
      let entities = [];
      for (let entity of data.entities) {
        //TODO Process BILOU
      }

      return {
        content: data.sentence,
        entities: data.entities.map(entity => ({
          text: entity.text,
          label: entity.tag.name,
          start: entity.start,
          end: entity.end
        }))
      }
    });
    if (this.appendToExisting && this.appendData) {
      this.appendData.push(...output);
      output = this.appendData;
    }
    return JSON.stringify(output, null, 4)
  }

  private getCSVTagged() {
    let output = [];
    if (this.appendToExisting && this.appendData) {
      output.push(...this.papa.parse(this.appendData).data)
    }

    const sentenceCount = output.filter(row => row[0]).length
    output.push(...this.getTokenSplit(sentenceCount))
    
    return this.papa.unparse(output);
  }

  private getTokenSplit(numExisting): string[][] {
    let output: string[][] = [];

    this.annotatedService.finisedTagged.forEach((data, index) => {
      let startIndex = 0;
      for (let token of data.sentence.split(' ')) {
        let endIndex = startIndex + token.length;
        let entities = data.entities.filter(entity => entity.start <= startIndex && entity.end >= endIndex)
        let line = [
          startIndex == 0 ? `Senetence: ${numExisting + index + 1}` : '',
          token,
          getPositionalTagFormat(entities.length > 0 && entities[0], startIndex, endIndex, this.additionalTaggingType)
        ]
        output.push(line);
        startIndex += (token.length + 1)
      }
    })
    return output;
  }


}
