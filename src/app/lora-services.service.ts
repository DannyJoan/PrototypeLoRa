import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoraServicesService {

  url = "http://localhost:3000";


  constructor( private http: HttpClient) { }

  getLatitudLongitud(){
    return this.http.get(`${this.url}/localizacion`).toPromise();
  }

  getSignosVitales(){
    return this.http.get(`${this.url}/signosVitales`).toPromise();
  }

  getMensaje(){
    return this.http.get(`${this.url}/mensajeUsuario`).toPromise();
  }
}
