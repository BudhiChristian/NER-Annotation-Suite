import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JsonValidatorService, JSONSchemas } from 'src/app/services/json-validator.service';

export interface ValidationParse {
  data: any,
  isValid: boolean,
  message: string
}

@Component({
  selector: 'app-choose-append',
  templateUrl: './choose-append.component.html',
  styleUrls: ['./choose-append.component.scss']
})
export class ChooseAppendComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() outputType: string;
  @Output('onValidate') onValidate: EventEmitter<any> = new EventEmitter<any>();

  message: string = '';

  readonly appendAccept: any = {
    'json (spaCy)': '.json',
    'csv': '.csv'
  }

  constructor(
    private jsonValidator: JsonValidatorService
  ) { }

  ngOnInit() {
  }

  validate(file) {
    let reader = new FileReader()
    reader.onload = (r: any) => {
      let res: ValidationParse;
      switch(this.outputType) {
        case 'json (spaCy)': 
          res = this.validateSpacy(r.target.result);
          break;
        case 'csv':
          res = this.validateCsv(r.target.result);
          break;
        default:
          res = {
            data: undefined,
            isValid: false,
            message: 'invalid output type chosen'
          }
      }
      this.message = res.message;
      if (res.isValid) {
        this.onValidate.emit(res.data);
      } else {
        this.onValidate.emit(undefined)
      }
    }
    this.message = 'parsing...'
    reader.readAsText(file);
  }

  validateSpacy(text: string): ValidationParse {
    let parsedJson = JSON.parse(text);
    let validation = this.jsonValidator.validateData(JSONSchemas.SPACY, parsedJson)
    return {
      data: parsedJson,
      isValid: validation.isValid,
      message: validation.errors
    }
  }

  validateCsv(text: string): ValidationParse {
    console.log(text)
    return {
      data: text,
      isValid: true,
      message: 'No errors'
    }
  }

}
