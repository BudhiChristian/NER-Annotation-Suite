import { Injectable } from '@angular/core';
import * as AJV from 'ajv';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

export enum JSONSchemas {
  SPACY = 'assets/schemas/spacy-schema.json'
}

@Injectable({
  providedIn: 'root'
})
export class JsonValidatorService {  
  private readonly schemas: string[] = [
    JSONSchemas.SPACY
  ]

  private validator: AJV.Ajv;

  constructor(private http: HttpClient) { 
    this.validator = new AJV();
    const observables = this.schemas.map(schema => this.http.get(schema))
    forkJoin(observables).subscribe((schemaRes) => {
      schemaRes.forEach((schema, index) => {
        this.validator.addSchema(schema, this.schemas[index])
      })
    })
  }

  public validateData<T>(schemaName: string, data: T): { isValid: boolean, errors: string } {
    const isValid = this.validator.validate(schemaName, data) as boolean;
    return {
      isValid: isValid,
      errors: this.validator.errorsText()
    }
  }
}
