import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-txt-file',
  templateUrl: './txt-file.component.html',
  styleUrls: ['./txt-file.component.scss']
})
export class TxtFileComponent implements OnInit {
  @Output('onLineParsed') onLineParsed: EventEmitter<string[]> = new EventEmitter<string[]>();

  public readonly LINE_DELIMITERS = {
    'Linefeed (\\n)': '\n',
    'Carriage Return (\\r)': '\r',
    'Return + Linefeed (\\r\\n)': '\r\n'
  }
  public readonly DELIMITER_OPTIONS = Object.keys(this.LINE_DELIMITERS);

  rawText: string = '';
  delimiter: string = '';
  parseMessage: string = '';

  constructor() { }

  ngOnInit() {
  }

  readFile(file) {
    let reader = new FileReader()
    reader.onload = (f: any) => {
      this.rawText = f.target.result
    }
    reader.readAsText(file)
  }

  parseText() {
    let lines = this.rawText.split(this.delimiter)
    if(lines.length > 0) {
      this.parseMessage = `Found ${lines.length} Sentences`
      this.onLineParsed.emit(lines);
    } else {
      this.parseMessage = 'Could not properly parse file.'
    }
  }

}
