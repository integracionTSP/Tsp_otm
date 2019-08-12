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
  // usuario 
  userName = JSON.parse(localStorage.getItem('user'));
  orderDate: Date;

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

  //powerDriverGID: any = { powerGID: 'TTU985', driverGID: '1067862970' }

  //powerDriverGID: any = { powerGID: 'TTU991', driverGID: '5136074' }



   powerDriverGID: any = { powerGID: '', driverGID: '' }

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

  dataDriverValid: any = [];

  // datos a validar de la placa 

  dataPowerValid: any = [];

  powerTecnoDate: any = '';

  powerSoatDate: any = '';

  powerStatus: any = '';

  driverlicDate: any = '';

  driverName: any = '';

  driverStatus: any = '';



  // lista de mensajes

  listMessageError: any = [{
    id: 0,
    message: `El conductor no esta activo`,

  },
  {
    id: 1,
    message: `La placa  no esta activa`
  },
  {
    id: 2,
    message: `La tecnomecania de la placa esta vencida`
  },
  {
    id: 3,
    message: `Placa  tiene  el soat  vencido`
  },
  {
    id: 4,
    message: `La licencia esta vencida`
  },
  {
    id: 5,
    message: 'Rellene los campos'
  }

  ];

  //lista de mensajes de correo

  listEmailTemplate: any = [{
    id: 0,
    subject: this.listMessageError[0].message,
    body: ``

  },
  {
    id: 1,
    subject: this.listMessageError[1].message,
    body: ``
  },
  {
    id: 2,
    subject: this.listMessageError[2].message,
    body: ``


  },
  {
    id: 3,
    subject: this.listMessageError[3].message,
    body: ``
  },
  {
    id: 4,
    subject: this.listMessageError[4].message,
    body: ``

  }


  ];


  // mensajes de error
  messageError: string;


  // mensaje del cuerpo

  messageBody: string;




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
    localStorage.setItem('user', null);
    this.router.navigate(['/login']);
  }


  driverValid(): void {

    this.GetdataService.driverValid(this.powerDriverGID).subscribe(result => {

      this.dataDriverValid = result.response;

     
        

       this.driverName = this.dataDriverValid[0].driver_full_name;
       this.driverlicDate =  this.dataDriverValid[0].expiracion_licencia;
       this.driverStatus= this.dataDriverValid[0].is_active;

       if(this.driverlicDate < this.dataDriverValid[0].fecha_actual){

        this.messageError = this.listEmailTemplate[4].subject;
                            setTimeout(()=>{   
                              this.alertMessageError(this.messageError);
                       }, 300);

       
 
       }

       if(this.driverStatus ='N'){
        this.messageError = this.listEmailTemplate[0].subject;
        setTimeout(()=>{   
          this.alertMessageError(this.messageError);
   }, 300);

       }

      
      console.log('datos del conductor a validar', this.dataDriverValid);

   



    }, error => {
      console.log(JSON.stringify(error));

    }
    );

  }

  powerValid(): void {

    this.GetdataService.powerValid(this.powerDriverGID).subscribe(result => {

      this.dataPowerValid = result.response;
 
         
      
      
           this.powerTecnoDate = this.dataPowerValid[0].vence_tecnomecanica;
           this.powerSoatDate = this.dataPowerValid[0].vence_soat;
           this.powerStatus = this.dataPowerValid[0].is_active;

           if(this.powerSoatDate < this.dataPowerValid[0].fecha_actual){

            this.messageError = this.listEmailTemplate[3].subject;
            setTimeout(()=>{   
              this.alertMessageError(this.messageError);
             }, 300);

           }


           if( this.powerTecnoDate < this.dataPowerValid[0].fecha_actual){

            this.messageError = this.listEmailTemplate[2].subject;
            setTimeout(()=>{   
              this.alertMessageError(this.messageError);
             }, 300);

           }


           if(this.powerStatus='N'){
            this.messageError = this.listEmailTemplate[1].subject;
            setTimeout(()=>{   
              this.alertMessageError(this.messageError);
       }, 300);
    
           }
    
            
         


 
        



      console.log('datos de la placa  a validar', this.dataPowerValid);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );

  }

  
  // envio de correos

  sendMessageMail(messageError: string, messageBody: string): void {
    
    
    this.GetdataService.sendMail(this.userName.email, messageError, messageBody).subscribe(result => {

      console.log(result);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );


  }

  //alertas de mensaje de error
  alertMessageError(messageError: string) {
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

          console.log('fecha expiracion licencia: ', this.driverlicDate );
          console.log('estado del conductor: ', this.driverStatus);
          console.log('fecha soat: ', this.powerSoatDate);
          console.log('fecha tecnomecanica: ',this.powerTecnoDate );
          console.log('estado de la placa: ',  this.powerStatus);

          // licencia sea vigente

          if (this.dataDriverValid[0].expiracion_licencia > this.dataDriverValid[0].fecha_actual) {


            // conductor este activo
            switch (this.dataDriverValid[0].is_active) {
              case 'N':
                console.log('el conductor no esta activo');

                this.listEmailTemplate[0].body = `El conductor ${this.driverName} no esta activo con la placa  ${this.powerDriverGID.powerGID} 

                fecha expiracion licencia:  ${this.driverlicDate}
                estado del conductor:  ${this.driverStatus}
                fecha vencimiento del soat: ${this.powerSoatDate}
                fecha de la tecnomecanica: ${this.powerTecnoDate}
                estado de la placa: ${this.powerStatus}`

                this.messageError = this.listEmailTemplate[0].subject;
                this.messageBody = this.listEmailTemplate[0].body;

                this.sendMessageMail(this.messageError, this.messageBody);
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

                        this.listEmailTemplate[1].body = ` EL conductor: ${this.driverName} con La placa ${this.powerDriverGID.powerGID}  no esta activa 

                        fecha expiracion licencia:  ${this.driverlicDate}
                        estado del conductor:  ${this.driverStatus}
                        fecha vencimiento del soat: ${this.powerSoatDate}
                        fecha de la tecnomecanica: ${this.powerTecnoDate}
                        estado de la placa: ${this.powerStatus}
                        `
                        this.messageError = this.listEmailTemplate[1].subject;
                        this.messageBody = this.listEmailTemplate[1].body;

                        //     setTimeout(()=>{   
                        //        this.sendMessageMail(this.messageError,this.messageBody);
                        //  }, 300);

                        this.sendMessageMail(this.messageError, this.messageBody);
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
                    this.listEmailTemplate[2].body = `La tecnomecania esta vencida: ${this.powerTecnoDate} con placa ${this.powerDriverGID.powerGID}
                    
                    fecha expiracion licencia:  ${this.driverlicDate}
                    estado del conductor:  ${this.driverStatus}
                    fecha vencimiento del soat: ${this.powerSoatDate}
                    fecha de la tecnomecanica: ${this.powerTecnoDate}
                    estado de la placa: ${this.powerStatus} `

                    this.messageError = this.listEmailTemplate[2].subject;
                    this.messageBody = this.listEmailTemplate[2].body;
                    this.sendMessageMail(this.messageError, this.messageBody);
                    this.alertMessageError(this.messageError);



                  }

                } else {

                  console.log('el soat esta vencido');
                
                  this.listEmailTemplate[3].body = `El soat esta vencido: ${this.powerSoatDate} con placa ${this.powerDriverGID.powerGID} 

                  fecha expiracion licencia:  ${this.driverlicDate}
                  estado del conductor:  ${this.driverStatus}
                  fecha vencimiento del soat: ${this.powerSoatDate}
                  fecha de la tecnomecanica: ${this.powerTecnoDate}
                  estado de la placa: ${this.powerStatus}`

                  this.messageError = this.listEmailTemplate[3].subject;
                  this.messageBody = this.listEmailTemplate[3].body;
                  this.sendMessageMail(this.messageError, this.messageBody);
                  this.alertMessageError(this.messageError);


                }

                break;
            }
          } else {

            console.log('La licencia esta vencida');

            this.listEmailTemplate[4].body =  `EL conductor: ${this.driverName} con placa ${this.powerDriverGID.powerGID}
            tiene la licencia esta vencida: ${this.driverlicDate}
            
            fecha expiracion licencia:  ${this.driverlicDate}
            estado del conductor:  ${this.driverStatus}
            fecha vencimiento del soat: ${this.powerSoatDate}
            fecha de la tecnomecanica: ${this.powerTecnoDate}
            estado de la placa: ${this.powerStatus}`

            this.messageError = this.listEmailTemplate[4].subject;
            this.messageBody = this.listEmailTemplate[4].body;
            this.sendMessageMail(this.messageError, this.messageBody);
            this.alertMessageError(this.messageError);



          }


        } else {
          // mostrar otras rutas

   
       

         if( this.dataPowerValid !== this.notFoundMessage && this.dataDriverValid !== this.notFoundMessage ){
           
            this.searchDistPowerDriver(powerDriverGID);
            this.enableAvailableRoutes = false;
            this.enableOtherRoutes = true;

          }else{
            this.alertMessageError(this.powerDriverGIDResult);
            console.log(this.powerDriverGIDResult);
            this.enableAvailableRoutes = false;
            this.enableOtherRoutes = false;
          }
         
     
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
      console.log(this.orderDate);
    }, error => {
      console.log(JSON.stringify(error));

    }
    );


  }


  generarPDF() {

    this.OperationReports(this.dataPrintResult.shipment_gid, this.powerDriverGID.driverGID, this.powerDriverGID.powerGID, this.fecha.toString(), this.userName.username, this.orderDate, this.selectRoutesChk.source_location_gid, this.selectRoutesChk.dest_location_gid);
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
      doc.addImage(img, 'jpg', 12, 22, imgWidth, imgHeight);

      doc.save(nombreDoc);
    });



  }


  // log de reportes

  OperationReports(shipmentGID: string, driverGID: string, powerGID: string, insertDate: string, insertUser: any, orderDate: any, sourceLocationGID: any, destLocationGID: any): void {

    this.GetdataService.OperationReports(shipmentGID, driverGID, powerGID, insertDate, insertUser, orderDate, sourceLocationGID, destLocationGID).subscribe(result => {

      console.log(result);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );


  }

  ngOnInit() {
  }

}
