import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importar el observable
import { Observable } from 'rxjs';

// definir la url principal

const urlPrincipal = 'http://localhost:3000/api/ordenCarga/';


@Injectable()
export class GetdataService {

  // inyectar el httpclient
  constructor(private httpClient: HttpClient) { }

  // metodo para obtener registros
  AllUser(): Observable<any> {
    return this.httpClient.get(urlPrincipal + 'getAllUserPass');

  }
  // rutas disponibles asociadas a la placa y conductor
  searchPowerDriver(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(urlPrincipal + `getAsociados/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`);
  }

   // otras rutas  asociadas a la placa y conductor
  searchDistPowerDriver(powerDriverGID: any): Observable<any> {
    return this.httpClient.get(urlPrincipal + `getDistintos/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`);
  }

  // imprimir datos del pdf
  searchDataPrint(powerDriverGID: any, selectRoutesChk: any ): Observable<any> {

    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(urlPrincipal + `getPrintShipment/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}/${selectRoutesChk.source_location_gid}/${selectRoutesChk.dest_location_gid}`);
  }

  // datos para validaciones del conductor 

  driverValid(powerDriverGID : any): Observable<any> {

    return this.httpClient.get(urlPrincipal + `getDriverValid/${powerDriverGID.driverGID}`);
  }

    // datos para validaciones del conductor 
  powerValid(powerDriverGID : any): Observable<any> {

    return this.httpClient.get(urlPrincipal + `getPowerValid/${powerDriverGID.powerGID}`);
  }

  sendMail(p_to : string , p_subject  : string, p_body: string){

    return this.httpClient.post('http://localhost:3000/api/mail/send',{p_to,p_subject,p_body});
  }






}




