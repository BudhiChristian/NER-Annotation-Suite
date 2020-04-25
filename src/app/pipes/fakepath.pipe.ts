import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fakepath'
})
export class FakepathPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let split = value.split('\\')
    return split[split.length-1]
  }

}
