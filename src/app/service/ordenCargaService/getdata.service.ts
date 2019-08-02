import { Injectable } from '@angular/core';
//importar servicios http
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importar el observable
import { Observable } from 'rxjs';



//definir la url principal 
const URL_principal = 'http://localhost:3000/api/ordenCarga/';



@Injectable()
export class GetdataService {

  // inyectar el httoclient
  constructor(private httpClient: HttpClient) { }

  // metodo para obtener registros
  AllUser(): Observable<any> {
    return this.httpClient.get(URL_principal + 'getAllUserPass');

  }

  searchPowerDriver(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(URL_principal+`getAsociados/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`);
  }


  searchDistPowerDriver(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(URL_principal +`getDistintos/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`);
  }





}




