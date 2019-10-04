import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';
// importar las rutas
import { EndPoints } from '../../global/endpoint'




@Injectable()
export class GetConstComplimentService {

  urlPrincipalCC: string;

  constructor(private httpClient: HttpClient) {
    const endPoint = new EndPoints();
    this.urlPrincipalCC = endPoint.constCumplido;

  }



  // datos para validaciones placas
  searchConstcompliment(
    powerUnitGID: any,
    startDate: Date,
    endDate: Date): Observable<any> {

    return this.httpClient.get(
      this.urlPrincipalCC + `getconstcompliment/${powerUnitGID}/${startDate}/${endDate}`
    );
  }


  // log de ordenes de carga
  OperationReports(
    SHIPMENT_GID: string,
    POWER_UNIT_GID: string,
    DRIVER_GID: string,
    INSERT_DATE: string,
    INSERT_USER: any,
    FECHA_CONST_CUMP: Date,
    TIQUETE_CARGUE: number,
    SOURCE_LOCATION_GID: string,
    DEST_LOCATION_GID: string): Observable<any> {


    return this.httpClient.post(
      this.urlPrincipalCC + 'addConstReport',
      {
        SHIPMENT_GID,
        POWER_UNIT_GID,
        DRIVER_GID,
        INSERT_DATE,
        INSERT_USER,
        FECHA_CONST_CUMP,
        TIQUETE_CARGUE,
        SOURCE_LOCATION_GID,
        DEST_LOCATION_GID
      }

    );

  }





}
