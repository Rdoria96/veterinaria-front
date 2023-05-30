import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], filterValue: string): any[] {
    if (!data || !filterValue) {
      return data;
    }
    filterValue = filterValue.toLowerCase();
    return data.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key) && item[key].toString().toLowerCase().includes(filterValue)) {
          return true;
        }
      }
      return false;
    });
  }

}
