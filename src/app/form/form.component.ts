import { Component, OnInit } from '@angular/core';
// importar el servicio
import { GetdataService } from '../service/ordenCargaService/getdata.service';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // inicializar validaciones de formularios
  formPowerDriverGID: FormGroup;

  //rutas disponibles 
  enableAvailableRoutes: boolean = false;

  // otras rutas 
  enableOtherRoutes: boolean = false;

  // btn imprimir
  enableBtnPrint: boolean = false;

  // btn aceptar
  enableBtnAcept: boolean = true;

  // captura de datos de los inzut
  powerDriverGID: any = { powerGID: 'SXV600', driverGID: '84457569' }

  // mensaje no encontrado
  notFoundMessage: String = "No existe movimiento con datos ingresados";

  //resultados de la busqueda
  powerDriverGIDResult: any = {};

  //resultados distintos rutas de la busqueda
  powerDriverGIDDistResult: any = {};

  // viaje seleccionado de la tabla rutas disponibles
  selectAvailableRoutesChk: any = {}

  // viaje seleccionado de la tabla rutas disponibles
  selectOtherRoutesChk: any = {}



  constructor(private GetdataService: GetdataService, private router: Router, public fb: FormBuilder) {

    this.formPowerDriverGID = this.fb.group({
      powerGID: ['', [Validators.required]],
      driverGID: ['', [Validators.required]]
    });


  }


  // limpiar campos
  cleanInput(): void {
    this.powerDriverGID = { powerGID: '', driverGID: '' }
  }


  // buscar por placa e identificacion

  searchPowerDriver(powerDriverGID: any): void {


    if (powerDriverGID.powerGID && powerDriverGID.driverGID) {

      this.GetdataService.searchPowerDriver(powerDriverGID).subscribe(result => {
        // capturar los datos de la url
        this.powerDriverGIDResult = result.response;

        // validar que el registro exista
        if (this.powerDriverGIDResult != this.notFoundMessage) {
          this.enableAvailableRoutes = true;
          console.log(this.powerDriverGIDResult);

        } else {
          console.log(this.powerDriverGIDResult);
          this.enableAvailableRoutes = false;
        }


      }, error => {
        console.log(JSON.stringify(error));
      }

      );

    } else {
      console.log('rellene los campos');
      this.enableAvailableRoutes = false;
      this.enableOtherRoutes = false;
      this.enableBtnPrint = false;

    }


    console.log(powerDriverGID);



  }



  // seleccionar el viaje disponible individual de la tabla rutas disponibles
  availableRouteSelect(AvailableRoutesChk: any): void {
    this.enableOtherRoutes = false;

    this.enableBtnPrint = true;

 

    this.selectAvailableRoutesChk = AvailableRoutesChk;
    console.log("ruta disponible seleccionada ", this.selectAvailableRoutesChk);

  }

  // DESTINOS DISTINTOS A LOS ASOCIADOS

  searchDistPowerDriver(powerDriverGID: any): void {

    this.enableBtnPrint = false;
    if (powerDriverGID.powerGID && powerDriverGID.driverGID) {

      this.GetdataService.searchDistPowerDriver(powerDriverGID).subscribe(result => {

        this.powerDriverGIDDistResult = result.response;

        // validar que el registro exista
        if (this.powerDriverGIDDistResult != this.notFoundMessage) {
          this.enableOtherRoutes = true;
          console.log("resultados distintos ", this.powerDriverGIDDistResult);

        } else {
          console.log(this.powerDriverGIDDistResult);
          this.enableOtherRoutes = false;
        }

        this.enableOtherRoutes = true;



      }, error => {

        console.log(JSON.stringify(error));
      }


      );



    }


  }


  // seleccionar otros  individual de la tabla rutas disponibles
  otherRouteSelect(otherRoutesChk: any): void {
    this.enableBtnPrint = true;
    this.selectOtherRoutesChk = otherRoutesChk;
    console.log("otra ruta seleccionada ", this.selectOtherRoutesChk);

  }

  ngOnInit() {
  }

}
