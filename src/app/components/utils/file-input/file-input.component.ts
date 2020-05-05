import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() accept = '';
  @Output("onFileSelect") onFileSelect: EventEmitter<string> = new EventEmitter<string>();
  
  fileName: string = '';

  constructor() { }

  ngOnInit() {
  }

  onFileChange(event) {
    let file = event.target.files[0]
    if(file) {
      this.onFileSelect.emit(file)
    } else {
      this.fileName = "Could not read file..."
    }
  }

}
