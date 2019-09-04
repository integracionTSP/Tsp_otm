import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';

import { EndPoints } from './../../global/endpoint';

import { UtilFunction } from './../../global/utils';




@Injectable()
export class ConstComplimentService {



  utilFunction = new UtilFunction();
  // funcion convertir mayusculas
  UppCase = this.utilFunction.upperCase;

  urlPrincipalCC: string;

  constructor(private httpClient: HttpClient) {

    const endPoint = new EndPoints();
    this.urlPrincipalCC = endPoint.constCumplido;
  }

  // datos para validaciones placas
  powerValid(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(this.urlPrincipalCC + `getPowerValid/${this.UppCase(powerDriverGID.powerGID)}`);
  }



}
