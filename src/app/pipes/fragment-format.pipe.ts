import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fragmentFormat'
})
export class FragmentFormatPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value.toLowerCase().split(' ').join('-');
  }

}
