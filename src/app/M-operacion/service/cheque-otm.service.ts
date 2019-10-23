import { Injectable } from '@angular/core';
// importar servicios http
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// importar el observable
import { Observable } from 'rxjs';
// importar las rutas
import { EndPoints } from '../../global/endpoint'


export class GetChequeOtmService {

  urlPrincipalCO: string;

  constructor(private httpClient: HttpClient) {
    const endPoint = new EndPoints();
    this.urlPrincipalCO = endPoint.chequeOTM;
  }


  searchCheckList(
  
    idUser: String ,
    agencyID: String
    ): Observable<any> {
    return this.httpClient.get(
      this.urlPrincipalCO + `getCheckList/${idUser}/${agencyID}`
    );
  }

  searchActiveAccounts(
  
    idUser: String ,
    agencyID: String
    ): Observable<any> {
    return this.httpClient.get(
      this.urlPrincipalCO + `getActiveAccounts/${idUser}/${agencyID}`
    );
  }


  searchAccountDescription(
  
    idUser: String ,
    agencyID: String,
    accountNumber : Number
    ): Observable<any> {
    return this.httpClient.get(
      this.urlPrincipalCO + `getAccountDescription/${idUser}/${agencyID}/${accountNumber}`
    );
  }


   getProviderNit(): Observable<any> {
    return this.httpClient.get(
      this.urlPrincipalCO + `getProviderNit/`
    );
  }


  getBank(): Observable<any> {
    return this.httpClient.get(
      this.urlPrincipalCO + `getBank/`
    );
  }

  getAccountType(): Observable<any> {
    return this.httpClient.get(
      this.urlPrincipalCO + `getAccountType/`
    );
  }

  

  updateadvanced(
  
    accountID: Number,
    accountName: String,
    bank: String,
    accountNumber: Number,
    accountType : String,
    accountNit : String,
    oldAccountNumber : Number

    ): Observable<any> {

      return this.httpClient.post(this.urlPrincipalCO + 'updateAdvanced',
       { accountID, accountName, bank,accountNumber,accountType,accountNit,oldAccountNumber });
  }


  
  updateadvancedConfirm(
    idUser:String,
    providerNit:String,
    advancedType:String,
    accountNit : String,
   

    ): Observable<any> {

      return this.httpClient.post(this.urlPrincipalCO + 'updateAdvancedConfirm',
       { idUser, providerNit, advancedType,accountNit });
  }



  
  AddAcount(
    regStatus: String,
    dstrct: String,
    accountNit : String,
    bank: String,
    accountNumber: Number,
    accountType : String,
    accountName : String,
    accountID: Number,
    idUser: String

    ): Observable<any> {

      return this.httpClient.post(this.urlPrincipalCO + 'AddAcount',
       { regStatus, dstrct,accountNit, bank, accountNumber, accountType,accountName, accountID,idUser  });
  }





}
