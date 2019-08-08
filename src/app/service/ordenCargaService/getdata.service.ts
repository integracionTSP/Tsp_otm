import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importar el observable
import { Observable } from 'rxjs';

// definir la url principal

const urlPrincipalOC = 'http://172.16.248.185:3000/api/ordenCarga/';

const urlPrincipalEM = 'http://172.16.248.185:3000/api/mail/';


@Injectable()
export class GetdataService {

  // inyectar el httpclient
  constructor(private httpClient: HttpClient) { }

  // metodo para obtener registros
  AllUser(): Observable<any> {
    return this.httpClient.get(urlPrincipalOC + 'getAllUserPass');

  }
  // rutas disponibles asociadas a la placa y conductor
  searchPowerDriver(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(urlPrincipalOC + `getAsociados/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`);
  }

   // otras rutas  asociadas a la placa y conductor
  searchDistPowerDriver(powerDriverGID: any): Observable<any> {
    return this.httpClient.get(urlPrincipalOC + `getDistintos/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`);
  }

  // imprimir datos del pdf
  searchDataPrint(powerDriverGID: any, selectRoutesChk: any ): Observable<any> {

    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(urlPrincipalOC + `getPrintShipment/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}/${selectRoutesChk.source_location_gid}/${selectRoutesChk.dest_location_gid}`);
  }

  // datos para validaciones del conductor 

  driverValid(powerDriverGID : any): Observable<any> {

    return this.httpClient.get(urlPrincipalOC + `getDriverValid/${powerDriverGID.driverGID}`);
  }

    // datos para validaciones del conductor 
  powerValid(powerDriverGID : any): Observable<any> {

    return this.httpClient.get(urlPrincipalOC + `getPowerValid/${powerDriverGID.powerGID}`);
  }

  sendMail(p_to : string , p_subject  : string, p_body: string){

    return this.httpClient.post(urlPrincipalEM+'send',{p_to,p_subject,p_body});
  }

  OperationReports(shipmentGID: string, driverGID: string, powerGID:string, insertDate: string ,insertUser: any): Observable<any>{

    return this.httpClient.post(urlPrincipalOC+'saveReports',{shipmentGID, driverGID, powerGID, insertDate, insertUser});

  }


}




