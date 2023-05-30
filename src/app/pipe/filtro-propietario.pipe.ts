import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPropietario'
})
export class FiltroPropietarioPipe implements PipeTransform {
  transform(datos: any[], filtro: string): any[] {
    if (!datos || !filtro) {
      return datos;
    }
    filtro = filtro.toLowerCase();
    return datos.filter(element =>
      Object.values(element).some((valor: unknown) =>
        String(valor).toLowerCase().includes(filtro)
      )
    );
  }
}
