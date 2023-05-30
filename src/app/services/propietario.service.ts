import { Propietario } from './../interfaces/propietario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  servidor = 'http://ec2-3-83-1-28.compute-1.amazonaws.com:8080/api'
  constructor(private servicio: HttpClient) { }

getPropietarios():Observable<any>{
  return this.servicio.get(`${this.servidor}/mostrarpropietario`);
}

guardar(propietario: Propietario){
  return this.servicio.post<Propietario>(`${this.servidor}/propietario`,propietario);
}

}
