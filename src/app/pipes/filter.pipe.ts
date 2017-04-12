import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchFilter: string): any {
    searchFilter = searchFilter ? searchFilter.toLocaleLowerCase() : null;
    return searchFilter ? value.filter((obj: any) => 
    obj.name.toLocaleLowerCase().indexOf(searchFilter) !== -1) : value;
  }

}
