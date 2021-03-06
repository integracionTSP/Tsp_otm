import { Component } from '@angular/core';
// importar el servicio
import { GetdataService } from '../../service/getdata.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

class listMessageError {
  id: number;
  message: string;
}


@Component({
  selector: 'app-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})


export class FormComponent {
  // usuario 
  userName = JSON.parse(localStorage.getItem('user'));
  user = this.userName.username;
  orderDate: Date = new Date();
  d: Date;
  fecha: String = '';

 

  //rutas disponibles 
  enableAvailableRoutes: boolean = false;


  // otras rutas 
  enableOtherRoutes: boolean = false;

  // btn imprimir
  enableBtnPrint: boolean = false;

  // btn aceptar
  enableBtnAcept: boolean = true;



  // captura de datos de los input
 // powerDriverGID: any = { powerGID: 'SXV600', driverGID: '84457569' }

 // powerDriverGID: any = { powerGID: 'TTU985', driverGID: '1067862970' }

 // powerDriverGID: any = { powerGID: 'TTU991', driverGID: '5136074' }

 //powerDriverGID: any = { powerGID: 'TTU984', driverGID: '10305877' }
  
  



  powerDriverGID: any = { powerGID: '', driverGID: '' }



  //resultados de la busqueda
  powerDriverGIDResult: any = [{}];

  //resultados distintos rutas de la busqueda

  powerDriverGIDDistResult: any = [{}];

  // viaje seleccionado de la tabla rutas disponibles
  selectRoutesChk: any = {};

  // resultados de de datos para imprimir
  dataPrintResult: any = {};

  // datos a validar del conductor

  dataDriverValid: any = [];

  // datos a validar de la placa 

  dataPowerValid: any = [];

  powerTecnoDate: any = '';

  consecutivo: number;

  powerSoatDate: any = '';

  powerStatus: any = '';

  driverlicDate: any = '';

  driverName: any = '';

  driverStatus: any = '';


  genOrderResult: any = []

  /* Placa y Conductor
  powerDriverGID: any = { powerGID: 'TTU591', driverGID: '10244226' };
  // Placa Detalle
  dataPowerValid: any = [];
  powerTecnoDate: any;
  powerSoatDate: any;
  powerStatus: any;
  //Driver Detalle
  dataDriverValid: any = [];
  driverName: any;
  driverlicDate: any;
  driverStatus: any;
  */

  //Mensajes de Alerta
  AlertMessages: number[] = [];

  listMessageError: listMessageError[] = [{
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
  },
  {
    id: 6,
    message: 'No existe placa en el sistema'
  },
  {
    id: 7,
    message: 'No existe Conductor en el sistema'
  },
  {
    id: 8,
    message: 'Se realizo una solictud para un conductor que no tiene ordenes activas'
  }
  ];
  listEmailTemplate: any;


  msString: string;
  msMailString: string;


  //Cargan los datos de powerUnit
  getPowerUnit() {
    this.powerStatus = 'N';
    this.powerSoatDate = '';
    this.powerTecnoDate = '';
    this.GetdataService.powerValid(this.powerDriverGID).subscribe(result => {

      if (result.response != null) {
        this.dataPowerValid = result.response;
        let res = result.response;
        this.powerTecnoDate = this.dataPowerValid[0].vence_tecnomecanica;
        this.powerSoatDate = this.dataPowerValid[0].vence_soat;
        this.powerStatus = this.dataPowerValid[0].is_active;
        this.powerValid(res[0].vence_soat, res[0].vence_tecnomecanica, res[0].is_active, this.fecha)
      } else {
        this.AlertMessages.push(6);
      }
    }, error => {
      console.log(JSON.stringify(error));

    })
  }



  // Valida Soat --- Retorna True si el SOAT esta activo
  SoatValid(soat, now): Boolean {
    if (soat < now) {
      this.AlertMessages.push(3)
      return false
    } else {

      return true
    }
  }

  // Valida Tecnomecanica Retorna True si el Tecnomecanica esta activo
  TecnoValid(tecno, now): Boolean {

    if (tecno < now) {
      this.AlertMessages.push(2);
      return false
    } else {
      return true
    }
  }

  //Valida Placa Activa Retorna True si esta activo
  PowerStatusValid(st): Boolean {
    if (st == 'N') {
      this.AlertMessages.push(1);
      return false
    } else {
      return true
    }
  }

  //Datos conductor
  getDriver() {
    this.driverStatus = 'N'
    this.driverlicDate = ''
    this.GetdataService.driverValid(this.powerDriverGID).subscribe(result => {

      if (result.response != null) {
        this.dataDriverValid = result.response;
        let res = result.response;
        this.driverName = this.dataDriverValid[0].driver_full_name;
        this.driverlicDate = this.dataDriverValid[0].expiracion_licencia;
        this.driverStatus = this.dataDriverValid[0].is_active;
        this.fecha = res[0].fecha_actual;

        this.driverValid(res[0].expiracion_licencia, res[0].fecha_actual, res[0].is_active);

      } else {

        this.AlertMessages.push(7);
      }

    }, error => {
      console.log(JSON.stringify(error));
    }
    );

  }

  //Valida Licencia Retorna True si la licencia esta activa
  licenceValid(lic, now): Boolean {
    if (lic < now) {
      this.AlertMessages.push(4);
      return false
    } else {
      return true
    }
  }
  //Valida Driver Activo Retorna True si el conductor esta activo
  driverStatusValid(st): Boolean {
    if (st == 'N') {
      this.AlertMessages.push(0);
      return false
    } else {
      return true
    }
  }

  // Valida Driver General 
  driverValid(lic, now, st): Boolean {
    let license = this.licenceValid(lic, now);
    let status = this.driverStatusValid(st);
    if (license && status) {
      return true
    }
    return false

  }


  //Valida placa General
  powerValid(soat: any, tecno: any, st, now) {


    let soatv = this.SoatValid(soat, now)
    let tecnov = this.TecnoValid(tecno, now)
    let stv = this.PowerStatusValid(st)


    if (soatv && tecnov && stv) {
      return true
    }
    return false

  }

  // mensajes de error
  messageError: string;



  // mensaje del cuerpo

  messageBody: string;
  constructor(private GetdataService: GetdataService, private router: Router) {


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

  // envio de correos

  sendMessageMail(messageBody: string): void {

    let emails= 'ajhen217@gmail.com,auxsmcincocero@sanchezpolo.com, adonoso@sanchezpolo.com'
    this.GetdataService.sendMail(emails, '¡Alerta! novedades orden de carga', messageBody).subscribe(() => {

    }, error => {
      console.log(JSON.stringify(error));

    }
    );


  }

  //alertas de mensaje de error
  alertMessageError(messageError: string) {
    Swal.fire({
      type: 'error',
      title: 'Alerta',
      text: messageError,
      html: messageError,
      customClass: {
        popup: 'animated tada'
      }

    })
  }

  waitingMessage(title: string): Boolean {
    let timerInterval
    Swal.fire({
      title: title,
      html: 'Esto podria tardar <strong></strong> milisegundos.',
      timer: 500,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = <string><unknown>Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (
        /* Read more about handling dismissals below */
        result.dismiss == Swal.DismissReason.timer
      ) {

        return true
      }
    })
    return true
  }
  // buscar por placa e identificacion


  IsEmpty(): Boolean {
    if (this.powerDriverGID.powerGID && this.powerDriverGID.driverGID) {
      return false
    } else {
      return true
    }
  }

  getRoutes() {
    this.GetdataService.searchPowerDriver(this.powerDriverGID).subscribe(result => {
      // capturar los datos de la url
      this.powerDriverGIDResult = result.response;
      let res = result.response;
      if (res != null) {
        this.dataPrintResult.shipmentGID = res.shipment_gid;
        if (this.driverValid(this.driverlicDate, this.fecha, this.driverStatus) &&
          this.powerValid(this.powerSoatDate, this.powerTecnoDate, this.powerStatus, this.fecha)) {
          this.enableAvailableRoutes = true;
        }
      } else {
        this.AlertMessages.push(8);


        let driverV = this.driverValid(this.driverlicDate, this.fecha, this.driverStatus)
        let powerV = this.powerValid(this.powerSoatDate, this.powerTecnoDate, this.powerStatus, this.fecha)


        if (driverV && powerV) {

          this.enableOtherRoutes = true;
          this.enableAvailableRoutes = false;
          this.searchDistPowerDriver(this.powerDriverGID);

        } else {

          this.enableOtherRoutes = false;
          this.enableAvailableRoutes = false;

        }
      }
    })

  }

  


  searchPowerDriver(powerDriverGID: any) {
    
    

    if (this.powerDriverGID.driverGID && this.powerDriverGID.powerGID) {
      this.powerStatus, this.driverStatus = 'N', 'N';
      this.AlertMessages = []
      this.getDriver()
      this.getPowerUnit()

      this.waitingMessage("Validando credenciales...");

      setTimeout(() => {
        if (this.AlertMessages.length > 0) {
          this.msString = this.messageToString('<br>', `
      ¡Atención! Se le informa que para combinacion,<br>
      Placa: ${this.powerDriverGID.powerGID}<br>
      Conductor: ${this.powerDriverGID.driverGID}<br>
      Se presentaron los siguientes errores:` , this.AlertMessages);

          this.msMailString = this.messageToString('\n', `
      ¡Atención! Se le informa que para combinacion,
      Placa: ${this.powerDriverGID.powerGID}
      Conductor: ${this.powerDriverGID.driverGID}
      Se presentaron los siguientes errores:` , this.AlertMessages);

          this.alertMessageError(
            //this.messageToString('',this.AlertMessages)
            this.msString
          );
          this.sendMessageMail(this.msMailString)
        }else{

          if (powerDriverGID.powerGID && powerDriverGID.driverGID) {

            this.getRoutes();
            // mostrar otras 

          }

        }

        // Valida campos llenos
        
      }, 600)
    }else {
      this.alertMessageError(
        `¡Rellenas todos los campos!<br>` 
      );
    }

    }


    messageToString(space: string, base: string, listMessageError: number[]) {
      let text = base + space + space;
      listMessageError.forEach(element => {
        text += '--> ' + this.getMessageID(this.listMessageError, element) + space;
      });
      return text
    }

    getMessageID(listMessageError: listMessageError[], id: number): string {
      let mess = '';
      listMessageError.forEach(element => {
        if (element.id == id) {
          mess = element.message
        }
      });
      return mess
    }


    // seleccionar el viaje disponible individual de la tabla rutas disponibles
    availableRouteSelect(AvailableRoutesChk: any): void {
      this.enableOtherRoutes = false;
      this.selectRoutesChk = {};
      this.enableBtnPrint = true;
      this.selectRoutesChk = AvailableRoutesChk;


    }

    clear(){
      this.enableBtnPrint = false
      this.enableOtherRoutes = false
      this.enableAvailableRoutes = false
     
    }

    // DESTINOS DISTINTOS A LOS ASOCIADOS otras rutas

    searchDistPowerDriver(powerDriverGID: any): void {

      if(powerDriverGID.powerGID && powerDriverGID.driverGID) {

      this.GetdataService.searchDistPowerDriver(powerDriverGID).subscribe(result => {

        this.powerDriverGIDDistResult = result.response;

        // validar que el registro exista
        if (this.powerDriverGIDDistResult != null) {
          this.enableOtherRoutes = true;

        } else {
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
  }

  // buscar datos a imprimir

  searchDataPrint(): Boolean {
    if(this.orderDate){
    if (this.AlertMessages.length > 0) {
      this.msString = this.messageToString('<br>', `
      ¡Atención! Se le informa que para combinacion,<br>
      Placa: ${this.powerDriverGID.powerGID}<br>
      Origen:${this.selectRoutesChk.source_location_gid}<br>
      Destino:${this.selectRoutesChk.dest_location_gid}<br>
      Conductor: ${this.powerDriverGID.driverGID}<br>
      Se presentaron las siguientes novedades:` , this.AlertMessages);

      this.msMailString = this.messageToString('\n', `
      ¡Atención! Se le informa que para combinacion,
      Placa: ${this.powerDriverGID.powerGID}
      Conductor: ${this.powerDriverGID.driverGID}
      Origen:${this.selectRoutesChk.source_location_gid}
      Destino:${this.selectRoutesChk.dest_location_gid}
      Se presentaron las siguientes novedades:` , this.AlertMessages);
      this.alertMessageError(
        
        this.msString

      );
      this.sendMessageMail(this.msMailString)
    }

    this.dataPrintResult.shipment_gid = null;
    
    if (!this.enableOtherRoutes) {
      this.GetdataService.searchDataPrint(this.powerDriverGID, this.selectRoutesChk).subscribe(result => {
        if (result.response != null) {
          this.dataPrintResult = result.response[0];
          this.orderDate = this.dataPrintResult.fecha_order_release;

           this.OperationReports(this.dataPrintResult.shipment_gid, this.powerDriverGID.driverGID,
             this.powerDriverGID.powerGID, this.fecha.toString(), this.userName.username,
            this.orderDate, this.selectRoutesChk.source_location_gid,
             this.selectRoutesChk.dest_location_gid)
          return true
        }
      }, error => {
        console.log(JSON.stringify(error));
        return false
      }
      );
    } else {
       this.OperationReports(this.dataPrintResult.shipment_gid, this.powerDriverGID.driverGID,
         this.powerDriverGID.powerGID, this.fecha.toString(), this.userName.username,
        this.orderDate, this.selectRoutesChk.source_location_gid,
        this.selectRoutesChk.dest_location_gid)
    }


    this.clear()
    return false
  
  }else{
    this.alertMessageError(`
    Para poder continuar selecciona la fecha de la orden...<br>
    Pulsa <strong><span style ="color:red">OK</span></strong> para ver el estado del formato, pero, este no es un documento valido.<br><br>
    <strong>¡<span style ="color:red">No</span> esta registrado en el sistema!</strong> <br>
    `);
  }
  }


  generarPDF() {

 

    let nombreDoc = 'reporte_' + String(this.d.getTime()) + '.pdf';
    html2canvas(document.getElementById('pdf'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 1
    }).then(function (canvas) {

      var imgWidth = 88;
      var imgHeight = 115;
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF('p', 'mm', 'a6');
      doc.addImage(img, 'jpg', 10, 15, imgWidth, imgHeight,'NONE', 'FAST', 0);

      doc.save(nombreDoc);
    });



  }


  // log de reportes

  OperationReports(shipmentGID: string, driverGID: string, powerGID: string, insertDate: string,
    insertUser: any, orderDate: any, sourceLocationGID: any, destLocationGID: any): void {

    this.GetdataService.OperationReports(shipmentGID, driverGID, powerGID, insertDate, insertUser,
      orderDate, sourceLocationGID, destLocationGID).subscribe(result => {
        this.consecutivo = result.data.order_id;

        this.GetdataService.genPedido( this.consecutivo).subscribe(result => {

          this.genOrderResult = result;

          console.log('RESULTADO DE LA GEN DE LA ORDEN',this.genOrderResult);
          
        }, error => {
          console.log(JSON.stringify(error));
        });
        

      }, error => {
        console.log(JSON.stringify(error));

      }
      );


  }


  ngOnInit() {
  }







}
