import { Component, OnInit } from '@angular/core';
import { GetConstComplimentService } from './.././/../service/const-compliment.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// importar modelo
import { ConstComplimentEntity } from '../../models/const-compliment.entity'
// importar las funciones util
import { UtilFunction } from '../../../global/utils/function.utils';
import { UtilMessage } from "../../../global/utils/message.utils";

import { Router } from '@angular/router';


@Component({
  selector: 'app-const-compliment-form',
  templateUrl: './const-compliment-form.component.html',
  styleUrls: ['./const-compliment-form.component.css']
})
export class ConstComplimentFormComponent implements OnInit {

  formConstCompliment: FormGroup;
  constComResult: ConstComplimentEntity[] = [];

  driverResultRU: any = [];
  driverGIDRU: string;

  // btn imprimir
  userName = JSON.parse(localStorage.getItem('user'));
  btnPrint: Boolean = false;
  constComView: Boolean = false;
  selectConstCK: any = {};
  startDate:Date;
  endDate:Date;
  p: number = 1;


  constructor(private GetConstComplimentService: GetConstComplimentService, 
              public FormBuilder: FormBuilder, private router: Router,
              public constCompEntity: ConstComplimentEntity,
              public fun: UtilFunction,
              public mess: UtilMessage) {

    this.formConstCompliment = this.FormBuilder.group({
      powerUnitGID: [this.constCompEntity.powerUnitGID, [Validators.required]],
      startDate:['', [Validators.required]],
      endDate:['',[Validators.required]]
    });
  }

  getConstCompliment() {
    
    this.GetConstComplimentService.searchConstcompliment(this.constCompEntity.powerUnitGID,
                                                         this.startDate,
                                                         this.endDate).subscribe(result => {
      let res = result.response;
      
     
      if (res != null) {
        this.fun.waitingMessage(this.mess.getMessageID(this.mess.listMessageError,10));
        this.constComResult= res  ;
        console.log('CONSTresult',  this.constComResult);
        this.constComView = this.fun.enableView(this.constComView);
      } else {
        res = {};
        this.fun.alertMessageError(this.mess.getMessageID(this.mess.listMessageError,9));
        this.btnPrint= this.fun.disableView(this.btnPrint)
        this.constComView= this.fun.disableView(this.constComView)

      }
    }, error => {
      console.log(JSON.stringify(error));

    });

  }
  searchConstcompliment(powerUnitGID: any, startDate: Date, endDate: Date) {
  
    if (powerUnitGID && startDate && endDate) {
      this.constCompEntity.powerUnitGID = this.fun.upperCase(powerUnitGID);
      console.log(this.constCompEntity.powerUnitGID);
      this.getConstCompliment();
    } else {
      console.log('rellene los campos');
    }
  }

  constComSelect(constCom: any){
    this.btnPrint = this.fun.enableView(this.btnPrint);
    this.selectConstCK = {};
    this.selectConstCK = constCom;
    console.log('lo seleccionado es ', this.selectConstCK);
  }

  logOut() {
    localStorage.setItem('user', null);
    this.router.navigate(['/login']);
  }

  generatePDF(){

    this.fun.generarPDF();

    this.OperationReports(this.selectConstCK['shipment_gid'],
                          this.selectConstCK['power_unit_gid'],
                          this.selectConstCK['driver_gid'],
                          this.selectConstCK['fecha_constancia_cumplido'],
                          this.userName['username'],
                          this.selectConstCK['fecha_constancia_cumplido'],
                          this.selectConstCK['tiquete_cargue'],
                          this.selectConstCK['SOURCE_LOCATION_GID'],
                          this.selectConstCK['DEST_LOCATION_GID']);

    this.btnPrint= this.fun.disableView(this.btnPrint)
    this.constComView= this.fun.disableView(this.constComView)
  }

  OperationReports( 
    SHIPMENT_GID: string,
    POWER_UNIT_GID: string, 
    DRIVER_GID: string,
    INSERT_DATE: string,
    INSERT_USER: any,
    FECHA_CONST_CUMP: Date,
    TIQUETE_CARGUE: number,
    SOURCE_LOCATION_GID: string,
    DEST_LOCATION_GID: string): void {
    this.GetConstComplimentService.OperationReports( 
      SHIPMENT_GID,
      POWER_UNIT_GID,
      DRIVER_GID,
      INSERT_DATE,
      INSERT_USER,
      FECHA_CONST_CUMP,
      TIQUETE_CARGUE,
      SOURCE_LOCATION_GID,
      DEST_LOCATION_GID).subscribe(result => {
        let res = result.response;
        console.log(res);
      }, error => {
        console.log(JSON.stringify(error));

      }
      );
  }

  ngOnInit() {
  }

}
