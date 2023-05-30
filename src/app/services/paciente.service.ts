import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  servidor ="http://ec2-3-83-1-28.compute-1.amazonaws.com:8080/api"
  constructor(private servicio: HttpClient) { }

  getpaciente():Observable<any>{
    return this.servicio.get(`${this.servidor}/mostrarpaciente`);
  }

  guardar(paciente: Paciente){
    return this.servicio.post<Paciente>(`${this.servidor}/paciente`,paciente);
}
}
