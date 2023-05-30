import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  servidor = "http://ec2-3-83-1-28.compute-1.amazonaws.com:8080/api"
  constructor(private servicio: HttpClient) { }

  getCiudades():Observable<any>{
    return this.servicio.get(`${this.servidor}/ciudad`)
  }
}
