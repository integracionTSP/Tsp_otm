import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';

import { EndPoints } from "../../global/endpoint";

import { UtilFunction } from "../../global/utils/function.utils";



@Injectable()
export class GetdataService {

  utilFunction = new UtilFunction();

  UppCase = this.utilFunction.upperCase;

  urlPrincipalOC: string;
  urlPrincipalEM: string;
  urlPrincipalGP: string 
  // inyectar el httpclient
  constructor(private httpClient: HttpClient) {
    const endPoint = new EndPoints();
    this.urlPrincipalOC = endPoint.ordenCarga
    this.urlPrincipalEM = endPoint.mail
    this.urlPrincipalGP = endPoint.genPedido
  }


  // metodo para obtener registros
  AllUser(): Observable<any> {
    return this.httpClient.get(this.urlPrincipalOC + 'getAllUserPass');

  }
  // rutas disponibles asociadas a la placa y conductor
  searchPowerDriver(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(this.urlPrincipalOC + `getAsociados/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`)

  }

  // otras rutas  asociadas a la placa y conductor
  searchDistPowerDriver(powerDriverGID: any): Observable<any> {
    return this.httpClient.get(this.urlPrincipalOC + `getDistintos/${this.UppCase(powerDriverGID.powerGID)}/${powerDriverGID.driverGID}`);
  }

  // imprimir datos del pdf
  searchDataPrint(powerDriverGID: any, selectRoutesChk: any): Observable<any> {

    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(this.urlPrincipalOC + `getPrintShipment/${this.UppCase(powerDriverGID.powerGID)}/${powerDriverGID.driverGID}/${selectRoutesChk.source_location_gid}/${selectRoutesChk.dest_location_gid}`);
  }


  // datos para validaciones del conductor 

  driverValid(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(this.urlPrincipalOC + `getDriverValid/${powerDriverGID.driverGID}`);
  }

  // datos para validaciones placas
  powerValid(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(this.urlPrincipalOC + `getPowerValid/${this.UppCase(powerDriverGID.powerGID)}`);
  }


  // datos para validaciones del conductor y placas
  powerDriverValid(powerDriverGID: any): Observable<any> {

    return this.httpClient.get(this.urlPrincipalOC + `getPowerDriverValid/${this.UppCase(powerDriverGID.powerGID)}/${powerDriverGID.powerGID}`);
  }



// envio de correos
  sendMail(p_to: string, p_subject: string, p_body: string) {

    return this.httpClient.post(this.urlPrincipalEM + 'send', { p_to, p_subject, p_body });
  }


  //log de ordenes de carga
  OperationReports(shipment_gid: string, driver_gid: string, power_unit_gid: string, insert_date: string, insert_user: any, order_date: any, source_location_gid: any, dest_location_gid: any): Observable<any> {

    return this.httpClient.post(this.urlPrincipalOC + 'saveReports', { shipment_gid, driver_gid, power_unit_gid, insert_date, insert_user, order_date, source_location_gid, dest_location_gid });

  }


   genPedido(consecutivo : number): Observable<any> {

    return this.httpClient.get(this.urlPrincipalGP + `getGenPedido/${consecutivo}`);
  }



}




