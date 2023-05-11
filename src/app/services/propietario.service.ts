import { Propietario } from './../interfaces/propietario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
   servidor= 'http://localhost:8080/api'
  constructor(private servicio: HttpClient) { }

getPropietarios():Observable<any>{
  return this.servicio.get(`${this.servidor}/mostrarpropietario`);
}

guardar(propietario: Propietario){
  return this.servicio.post<Propietario>(`${this.servidor}/propietario`,propietario);
}

}
