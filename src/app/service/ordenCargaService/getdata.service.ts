import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';
// definir la url principal produccion

const urlPrincipalOC = 'http://172.16.3.222:3000/api/ordenCarga/';

const urlPrincipalEM = 'http://172.16.3.222:3000/api/mail/';

//const urlPrincipalOC = 'http://172.16.248.120:4000/api/ordenCarga/';

//const urlPrincipalEM = 'http://172.16.248.120:4000/api/mail/';
 



// definir la url principal produccion publica
 
 //const urlPrincipalOC = 'http://190.217.96.105:3000/api/ordenCarga/';

 //const urlPrincipalEM = 'http://190.217.96.105:3000/api/mail/';

//const urlPrincipalOC = 'http://172.16.248.185:3000/api/ordenCarga/';

 //const urlPrincipalEM = 'http://172.16.248.185:3000/api/mail/';
 
 

// definir la url test

// const urlPrincipalOC = 'http://192.168.1.97:3000/api/ordenCarga/';

// const urlPrincipalEM = 'http://192.168.1.97:3000/api/mail/';

//------------ ´PRUEBAS locales--------//

//const urlPrincipalOC = 'http://localhost:3000/api/ordenCarga/';

//const urlPrincipalEM = 'http://localhost:3000/api/mail/';


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

    return this.httpClient.get(urlPrincipalOC + `getAsociados/${powerDriverGID.powerGID}/${powerDriverGID.driverGID}`)

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

    // datos para validaciones placas
  powerValid(powerDriverGID : any): Observable<any> {

    return this.httpClient.get(urlPrincipalOC + `getPowerValid/${powerDriverGID.powerGID}`);
  }


    // datos para validaciones del conductor y placas
  powerDriverValid(powerDriverGID : any): Observable<any> {

    return this.httpClient.get(urlPrincipalOC + `getPowerDriverValid/${powerDriverGID.powerGID}/${powerDriverGID.powerGID}`);
  }

    



  sendMail(p_to : string , p_subject  : string, p_body: string){

    return this.httpClient.post(urlPrincipalEM+'send',{p_to,p_subject,p_body});
  }

  OperationReports(shipment_gid: string, driver_gid: string, power_unit_gid:string, insert_date: string ,insert_user: any, order_date:any, source_location_gid:any ,dest_location_gid:any): Observable<any>{

    return this.httpClient.post(urlPrincipalOC+'saveReports',{shipment_gid, driver_gid, power_unit_gid, insert_date, insert_user,order_date,source_location_gid ,dest_location_gid});

  }


}




