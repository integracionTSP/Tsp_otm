import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetChequeOtmService } from './../../service/cheque-otm.service';

import { Router } from '@angular/router';

// importar modelo
import { checkOTMEntity } from './../../models/operation.entity';

// importar las funciones util
import { UtilFunction } from '../../../global/utils/function.utils';
import { UtilMessage } from "../../../global/utils/message.utils";


@Component({
  selector: 'app-cheque-otm-form',
  templateUrl: './cheque-otm-form.component.html',
  styleUrls: ['./cheque-otm-form.component.css']
})
export class ChequeOtmFormComponent implements OnInit {

  formCheckOTM: FormGroup;
  checkListResult: any;
  providerNitResult: any;
  activeAccountsResult: any;
  accountDescResult: any;
  bankResult: any;
  accountTypeResult: any

  activeAccountView: boolean = false;
  checkListView: boolean = true;
  accountDescView: Boolean = false;

  btnBackCheckList: boolean = false;
  btnAcept: boolean = false;
  btnAdvanced: Boolean = false;

  p: number = 1;

  providerNitSelect: string = '';
  advancedTypeSelect: String = '';
  checkListSelect: {};
  accountActiveSelect:Number;
  oldAccountNumber: Number;
  advancedSelect : {};

  UserAgencyID = JSON.parse(localStorage.getItem('user'));
  idUser = this.checkOTMEntity.idUser = this.UserAgencyID['username'];
  agencyID = this.checkOTMEntity.agencyID = this.UserAgencyID['id_agencia'];

  



  constructor(private GetChequeOtmService: GetChequeOtmService,
    public FormBuilder: FormBuilder,
    public checkOTMEntity: checkOTMEntity,
    private router: Router,
    public fun: UtilFunction,
    public mess: UtilMessage) {

    this.formCheckOTM = this.FormBuilder.group({
      accountID: [this.checkOTMEntity.accountID, [Validators.required]],
      accountName: [this.checkOTMEntity.accountName, [Validators.required]],
      bank: [this.checkOTMEntity.bank, [Validators.required]],
      accountNumber: [this.checkOTMEntity.accountNumber, [Validators.required]],
      accountType: [this.checkOTMEntity.accountType, [Validators.required]],

    });
  }

  captureSelect() {

    console.log('select tipo anticipo:',this.advancedTypeSelect );
    console.log('select proveedor anticipo:', this.providerNitSelect);
  }


  captureAccount(){

    // nit, banco, cedula_cuenta, cuenta, tipo_cuenta
    this.searchAccountDesc();
    console.log('cuenta seleccionada',this.accountActiveSelect);
    
  }

  getBank(): void {

    this.GetChequeOtmService.getBank().subscribe(result => {
      this.bankResult = result.response;
      console.log('Bancos -->', this.bankResult);
    }, error => {
      console.log(JSON.stringify(error));
    }
    );
  }

  getAccountType(): void {

    this.GetChequeOtmService.getAccountType().subscribe(result => {
      this.accountTypeResult = result.response;
      console.log('tipos de cuneta -->', this.accountTypeResult);
    }, error => {
      console.log(JSON.stringify(error));
    }
    );
  }

  getProviderNit(): void {

    this.GetChequeOtmService.getProviderNit().subscribe(result => {
      this.providerNitResult = result.response;
      console.log('ProvedorNIT -->', this.providerNitResult);
    }, error => {
      console.log(JSON.stringify(error));
    }
    );
  }

  searchByID(): void {

    console.log('usuario', this.UserAgencyID);

    let idUser = this.idUser;
    let agencyID = this.agencyID;

    this.searchCheckList(idUser, agencyID);
    this.searchActiveAccounts(idUser, agencyID);

  }




  searchCheckList(idUser: String, agencyID: String): void {

    this.GetChequeOtmService.searchCheckList(idUser, agencyID).subscribe(result => {
      let res = result.response;

      if (res != null) {
        this.fun.waitingMessage(this.mess.getMessageID(this.mess.listMessageError, 10));
        this.checkListResult = res;
        console.log('datos de la table-->', this.checkListResult);

        // this.constComView = this.fun.enableView(this.constComView);
      } else {
        res = {};
        this.fun.alertMessageError(this.mess.getMessageID(this.mess.listMessageError, 9));
        //  this.btnPrint = this.fun.disableView(this.btnPrint)
        // this.constComView = this.fun.disableView(this.constComView)
      }
    }, error => {
      console.log(JSON.stringify(error));

    });

  }



  searchActiveAccounts(idUser: String, agencyID: String): void {

    this.GetChequeOtmService.searchActiveAccounts(idUser, agencyID).subscribe(result => {
      let res = [{}];
      
       res = result.response;
      if (res != null) {
        this.activeAccountsResult = [{}];
        this.activeAccountsResult = res;
        console.log('cuentas activas-->', this.activeAccountsResult);
        // this.constComView = this.fun.enableView(this.constComView);
      } else {
        res = [{}];
        //  this.btnPrint = this.fun.disableView(this.btnPrint)
        // this.constComView = this.fun.disableView(this.constComView)
      }
    }, error => {
      console.log(JSON.stringify(error));

    });

  }

  

  getAdvancedSelect(advancedSelect: any, providerNitSelect: string, advancedTypeSelect: String){

      console.log('anticipo selecionado',advancedSelect);
      console.log('proveedor ', providerNitSelect);
      console.log('tipo de anticipo', advancedTypeSelect);

      this.advancedSelect = {};
      this. advancedSelect =  advancedSelect;
      this.providerNitSelect = '';
      this.providerNitSelect = providerNitSelect;
      this.advancedTypeSelect = '';
      this.advancedTypeSelect = advancedTypeSelect; 
      
      this.btnAdvanced = this.fun.enableView(this.btnAdvanced);
      
     
  }


  searchAccountManagement(checkListSelect: any): void {

    console.log('<------------- Datos seleccionados ---------->');
    console.log('tabla', checkListSelect);
    this.checkListSelect = {}
    this.checkListSelect = checkListSelect;
    this.checkListView = this.fun.disableView(this.checkListView);
    this.activeAccountView = this.fun.enableView(this.activeAccountView);
    this.btnBackCheckList = this.fun.enableView(this.btnBackCheckList);
    this.btnAcept = this.fun.enableView(this.btnAcept);

  }



  backCheckList(): void {

    this.checkListView = this.fun.enableView(this.checkListView);
    this.activeAccountView = this.fun.disableView(this.activeAccountView);
    this.accountDescView = this.fun.disableView(this.accountDescView);
    this.btnBackCheckList = this.fun.disableView(this.backCheckList);
    this.btnAcept = this.fun.disableView(this.btnAcept);
  }


  searchAccountDesc() {

    let accountNumber = this.accountActiveSelect;
    let idUser = this.idUser;
    let agencyID = this.agencyID;
  
    this.GetChequeOtmService.searchAccountDescription(idUser, agencyID, accountNumber).subscribe(result => {
      let res = result.response;
      if (res != null) {
        this.accountDescResult = res;
        this.checkOTMEntity.regStatus = this.accountDescResult[0]['reg_status'];
        this.checkOTMEntity.dstrct = this.accountDescResult[0]['dstrct'];
        this.checkOTMEntity.accountID = this.accountDescResult[0]['cedula_cuenta'];
        this.checkOTMEntity.accountName = this.accountDescResult[0]['nombre_cuenta'];
        this.checkOTMEntity.bank = this.accountDescResult[0]['banco'];
        this.checkOTMEntity.accountNumber = this.accountDescResult[0]['cuenta'];
        this.checkOTMEntity.accountType = this.accountDescResult[0]['tipo_cuenta'];
        this.checkOTMEntity.accountNit = this.accountDescResult[0]['nit'];
        this.oldAccountNumber =  this.accountDescResult[0]['cuenta'];
        
        console.log('descripcion  de la cuenta-->', this.accountDescResult);
        // this.constComView = this.fun.enableView(this.constComView);
      } else {
        res = {};
        console.log('no hay cuentas relacionadas con el numero seleccionado');

        //  this.btnPrint = this.fun.disableView(this.btnPrint)
        // this.constComView = this.fun.disableView(this.constComView)
      }
    }, error => {
      console.log(JSON.stringify(error));

    });
    this.accountDescView = this.fun.enableView(this.accountDescView);
  }


  addAccount(checkOTMEntity: any){

    console.log('nuevos registro ',checkOTMEntity);
    

  }


  Updateadvanced(checkOTMEntity: any) {

    let accountID = checkOTMEntity.accountID;
    let accountName = checkOTMEntity.accountName;
    let bank = checkOTMEntity.bank;
    let accountNumber = checkOTMEntity.accountNumber;
    let accountType = checkOTMEntity.accountType;
    let accountNit = checkOTMEntity.accountNit;
    let oldAccountNumber =  this.oldAccountNumber;


    console.log('numero de cuenta old ', oldAccountNumber);
    
    console.log(checkOTMEntity);

    console.log(accountID,accountName,bank,accountNumber, accountType, accountNit, oldAccountNumber);

       this.GetChequeOtmService.updateadvanced(accountID,accountName,bank,accountNumber,accountType,accountNit,oldAccountNumber).subscribe(result => {
      let res = result.response;
      if (res != null) {
          console.log(res);
          this.fun.notifyMessageUpdate();
          this.searchByID();
          this.backCheckList();
      } else {
        res = {};
      }
    }, error => {
      console.log(JSON.stringify(error));

    });
  }


  
  updateadvancedConfirm() {

    let idUser = this.idUser;
    let providerNit = this.providerNitSelect;
    let advancedType = this.advancedTypeSelect;
    let accountNit = this.advancedSelect['nit']; 


    console.log(idUser,providerNit,advancedType,accountNit);

       this.GetChequeOtmService.updateadvancedConfirm(idUser,providerNit,advancedType,accountNit).subscribe(result => {
      let res = result.response;
      if (res != null) {
          console.log(res);
          this.fun.notifyMessageUpdate();
          this.searchByID();
          this.backCheckList();
          this.btnAdvanced = this.fun.disableView(this.btnAdvanced)
      } else {
        res = {};
        //  this.btnPrint = this.fun.disableView(this.btnPrint)
        // this.constComView = this.fun.disableView(this.constComView)
      }
    }, error => {
      console.log(JSON.stringify(error));

    });


  }





  

  ngOnInit() {

    this.getProviderNit();
    this.getBank();
    this.getAccountType();
    this.searchByID();


  }

}
