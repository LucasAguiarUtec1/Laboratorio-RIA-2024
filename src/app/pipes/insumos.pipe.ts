import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'insumos'
})
export class InsumosPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.nombre.toLowerCase().includes(searchText);
    })
  }

}
