import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';
// importar las rutas
import { EndPoints } from './../../global/endpoint';




@Injectable()
export class GetConstComplimentService {

  urlPrincipalCC: string;

  constructor(private httpClient: HttpClient ) {
    const endPoint = new EndPoints();
    this.urlPrincipalCC = endPoint.constCumplido;

  }



  // datos para validaciones placas
  searchConstcompliment(powerUnitGID: any,StartDate:Date,endDate:Date): Observable<any> {
    return this.httpClient.get(this.urlPrincipalCC + `getconstcompliment/${powerUnitGID}/${StartDate}/${endDate}`);
  }



}
