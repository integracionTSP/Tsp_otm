import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';
import { EndPoints } from "./../../global/endpoint";



@Injectable()
export class GetAuthService {

  
   urlPrincipalAU:string

  constructor(private httpClient: HttpClient) {
     const endPoint = new EndPoints();
     this.urlPrincipalAU  = endPoint.auth; 
   }

  // metodo para obtener registros
  AllUser(): Observable<any> {
    return this.httpClient.get(this.urlPrincipalAU + 'getAllUserPass');

  }

}




