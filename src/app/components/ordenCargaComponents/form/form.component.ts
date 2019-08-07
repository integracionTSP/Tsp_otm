import { Component, OnInit } from '@angular/core';
// importar el servicio
import { GetdataService } from 'src/app/service/ordenCargaService/getdata.service';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  d: Date;
  fecha: String = '';
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

  // captura de datos de los input
  //powerDriverGID: any = { powerGID: 'SXV600', driverGID: '84457569' }

  powerDriverGID: any = { powerGID: 'SSG351', driverGID: '1121871119' }

  //powerDriverGID: any = { powerGID: '', driverGID: '' }

  // mensaje no encontrado
  notFoundMessage: String = "No existe movimiento con datos ingresados";

  //resultados de la busqueda
  powerDriverGIDResult: any = {};

  //resultados distintos rutas de la busqueda

  powerDriverGIDDistResult: any = {};

  // viaje seleccionado de la tabla rutas disponibles
  selectRoutesChk: any = {};

  // resultados de de datos para imprimir
  dataPrintResult: any = {};

  // datos a validar del conductor

  dataDriverValid: any = {};

  // datos a validar de la placa 

  dataPowerValid: any = {};

  // lista de mensajes

  listMessageError: any = [{
    id: 0,
    message: 'El conductor no esta activo',

  },
  {
    id: 1,
    message: 'La placa  no esta activa'
  },
  {
    id: 2,
    message: 'La tecnomecania esta vencida'
  },
  {
    id: 3,
    message: 'El soat esta vencido'
  },
  {
    id: 4,
    message: 'La licencia esta vencida'
  },
  {
    id:5,
    message:'Rellene los campos'
  }

  ];

//

  listEmailTemplate : any = [{
    id: 0,
    subject : this.listMessageError[0].message,
    body: `El conductor no esta activo con la placa  ${this.powerDriverGID.powerGID}`

  },
  {
    id: 1,
    subject : this.listMessageError[1].message,
    body: `La placa ${this.powerDriverGID.powerGID}  no esta activa `
  },
  {
    id: 2,
    subject : this.listMessageError[2].message,
    body: `La tecnomecania esta vencida: ${this.dataPowerValid[0].vence_tecnomecanica} con placa ${this.powerDriverGID.powerGID}` 

    
  },
  {
    id: 3,
    subject : this.listMessageError[3].message,
    body: `El soat esta vencido: ${this.dataPowerValid[0].vence_soat} con placa ${this.powerDriverGID.powerGID}`
  },
  {
    id: 4,
    subject : this.listMessageError[3].message,
    body: `EL conductor: ${this.dataDriverValid[0].driver_full_name} con placa ${this.powerDriverGID.powerGID}
           tiene la licencia esta vencida: ${this.dataDriverValid[0].expiracion_licencia} `
   
  }
 

  ];


  // mensajes de error
  messageError: string;




  constructor(private GetdataService: GetdataService, private router: Router, public fb: FormBuilder) {

    this.formPowerDriverGID = this.fb.group({
      powerGID: ['', [Validators.required]],
      driverGID: ['', [Validators.required]]
    });


    this.d = new Date();
    this.fecha = this.d.getDate() + '-' + (this.d.getMonth() + 1) +
      '-' + this.d.getFullYear() + ' ' + this.d.getHours() + ':' +
      this.d.getMinutes() + ':' + this.d.getSeconds()

  }


  // // limpiar campos
  // cleanInput(): void {
  //   this.powerDriverGID = { powerGID: '', driverGID: '' }
  // }

  logOut() {
    localStorage.setItem('email', null);
    this.router.navigate(['/login']);
  }


  driverValid(): void {

    this.GetdataService.driverValid(this.powerDriverGID).subscribe(result => {

      this.dataDriverValid = result.response;


      console.log('datos del conductor a validar', this.dataDriverValid);


    }, error => {
      console.log(JSON.stringify(error));

    }
    );

  }

  powerValid(): void {

    this.GetdataService.powerValid(this.powerDriverGID).subscribe(result => {

      this.dataPowerValid = result.response;
      console.log('datos de la placa  a validar', this.dataPowerValid);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );

  }

  // envio de correos

  sendMessageMail(messageError: string): void {

    let emailTo = JSON.parse(localStorage.getItem('email'));
    this.GetdataService.sendMail(emailTo.email,this.listEmailTemplate.subject, this.listEmailTemplate.body).subscribe(result => {

      console.log(result);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );


  }

  //alertas de mensaje de error

  alertMessageError(messageError: string){

    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: messageError,
      customClass: {
        popup: 'animated tada'
      }

    })
  }



  // buscar por placa e identificacion

  searchPowerDriver(powerDriverGID: any, driverValid?: any): void {
    this.powerValid();
    this.driverValid();

    if (powerDriverGID.powerGID && powerDriverGID.driverGID) {

      this.GetdataService.searchPowerDriver(powerDriverGID).subscribe(result => {
        // capturar los datos de la url
        this.powerDriverGIDResult = result.response;

        // validar que el registro exista
        if (this.powerDriverGIDResult !== this.notFoundMessage) {

          console.log('fecha expiracion licencia: ', this.dataDriverValid[0].expiracion_licencia);
          console.log('estado del conductor: ', this.dataDriverValid[0].is_active);
          console.log('fecha soat: ', this.dataPowerValid[0].vence_soat);
          console.log('fecha tecnomecanica: ', this.dataPowerValid[0].vence_tecnomecanica);
          console.log('estado de la placa: ', this.dataPowerValid[0].is_active);

          // licencia sea vigente

          if (this.dataDriverValid[0].expiracion_licencia > this.dataDriverValid[0].fecha_actual) {
            // conductor este activo
            switch (this.dataDriverValid[0].is_active) {
              case 'N':
                console.log('el conductor no esta activo');
                this.messageError = this.listEmailTemplate[0].subject;

                this.sendMessageMail(this.messageError);
                this.alertMessageError(this.messageError);
            

                break;

              default:
                // soat vigente
                if (this.dataPowerValid[0].vence_soat > this.dataPowerValid[0].fecha_actual) {
                  // tecnomecanica vigente
                  if (this.dataPowerValid[0].vence_tecnomecanica > this.dataPowerValid[0].fecha_actual) {
                    // placa activa
                    switch (this.dataPowerValid[0].is_active) {
                      case 'N':
                        console.log('la placa  no esta activa');

                        this.messageError = this.listEmailTemplate[1].subject;
                        this.sendMessageMail(this.messageError);
                        this.alertMessageError(this.messageError);



                        break;
                      // mostrar datos si todo es correcto
                      default:
                        this.enableAvailableRoutes = true;
                        console.log('rutas disponible ', this.powerDriverGIDResult);
                        break;
                    }


                  } else {


                    console.log('la tecnomecania esta vencida');
                    this.messageError = this.listEmailTemplate[2].subject;
                    this.sendMessageMail(this.messageError);
                    this.alertMessageError(this.messageError);



                  }

                } else {

                  console.log('el soat esta vencido');
                  this.messageError = this.listEmailTemplate[3].subject;

                  this.sendMessageMail(this.messageError);
                  this.alertMessageError(this.messageError);


                }

                break;
            }
          } else {

            console.log('La licencia esta vencida');

            this.messageError = this.listEmailTemplate[4].subject;
            this.sendMessageMail(this.messageError);
            this.alertMessageError(this.messageError);



          }


        } else {

          console.log(this.powerDriverGIDResult);
          this.alertMessageError(this.powerDriverGIDResult);

          this.enableAvailableRoutes = false;
        }


      }, error => {
        console.log(JSON.stringify(error));
      }

      );

    } else {

      console.log('Rellene los campos');
      this.messageError = this.listMessageError[5].message;
      this.alertMessageError(this.messageError);

      this.enableAvailableRoutes = false;
      this.enableOtherRoutes = false;
      this.enableBtnPrint = false;

    }
    console.log(powerDriverGID);

  }



  // seleccionar el viaje disponible individual de la tabla rutas disponibles
  availableRouteSelect(AvailableRoutesChk: any): void {
    this.enableOtherRoutes = false;
    this.selectRoutesChk = {};
    this.enableBtnPrint = true;
    this.selectRoutesChk = AvailableRoutesChk;
    console.log("Ruta disponible seleccionada ", this.selectRoutesChk);


  }

  // DESTINOS DISTINTOS A LOS ASOCIADOS otras rutas

  searchDistPowerDriver(powerDriverGID: any): void {

    this.enableBtnPrint = false;
    if (powerDriverGID.powerGID && powerDriverGID.driverGID) {

      this.GetdataService.searchDistPowerDriver(powerDriverGID).subscribe(result => {

        this.powerDriverGIDDistResult = result.response;

        // validar que el registro exista
        if (this.powerDriverGIDDistResult !== this.notFoundMessage) {
          this.enableOtherRoutes = true;
          console.log("Resultados distintos ", this.powerDriverGIDDistResult);

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
    this.selectRoutesChk = {};
    this.selectRoutesChk = otherRoutesChk;
    console.log("Otra ruta seleccionada", this.selectRoutesChk);

  }


  // buscar datos a imprimir

  searchDataPrint(): void {


    this.GetdataService.searchDataPrint(this.powerDriverGID, this.selectRoutesChk).subscribe(result => {

      this.dataPrintResult = result.response[0];
      console.log('Datos a imprimir', this.dataPrintResult);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );


  }







  generarPDF() {
    console.log('FECHA: ' + this.d.toLocaleDateString());
    console.log('FECHA2: ' + this.fecha);
    console.log(this.d.getDay());
    console.log(this.d.getMonth() + 1);
    console.log(this.d.getTime());
    let nombreDoc = 'reporte_' + String(this.d.getTime()) + '.pdf';
    console.log(nombreDoc);
    html2canvas(document.getElementById('pdf'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 1
    }).then(function (canvas) {
      var imgWidth = 180;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF('l', 'mm', 'a5');
      doc.addImage(img, 'PNG', 12, 22, imgWidth, imgHeight);

      doc.save(nombreDoc);
    });
  }

  ngOnInit() {
  }

}
