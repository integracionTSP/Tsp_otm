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
  enableAvailableRoutes: boolean = true;
  // otras rutas 
  enableOtherRoutes: boolean = true;

  // captura de datos de los input
  powerDriverGID: any = { powerGID: '', driverGID: '' }


  // buscar por placa e identificacion

  searchPowerDriver(powerDriverGID: any): void {
    
       //hbailitar rutas disponibles 
    this.enableAvailableRoutes = true;
    
   


    // habilitar otras rutas 
    this.enableOtherRoutes = true;
    console.log(powerDriverGID);


  }



  constructor(private GetdataService: GetdataService, private router: Router, public fb: FormBuilder) {

      this.formPowerDriverGID = this.fb.group({
        powerGID :['',[Validators.required]],
        driverGID:['',[Validators.required]]
      });


   }

  ngOnInit() {
  }

}
