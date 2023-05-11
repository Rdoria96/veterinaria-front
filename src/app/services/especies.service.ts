import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {
    servidor = "http://localhost:8080/api"
  constructor(private servicio: HttpClient) { }

  getespecie():Observable<any>{
    return this.servicio.get(`${this.servidor}/especie`)
  }
}
