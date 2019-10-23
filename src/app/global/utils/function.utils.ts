

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

export class UtilFunction {

  //texto en  mayuscula
  upperCase(params: any): string {
    params = params.toUpperCase();
    //console.log('en mayusculas ',params);
    return params;
  }

  changeValueBoolean(params: any): boolean {
    params = !params;
    console.log(params);
    return params;


  }

  changeViewStatus(btn): boolean {
    let changeValue = this.changeValueBoolean(btn);
    btn = changeValue;
    return btn
  }

  enableView(btn): boolean {
    let changeValue = true
    btn = changeValue;
    return btn
  }

  disableView(btn): boolean {
    let changeValue = false
    btn = changeValue;
    return btn
  }


  generarPDF() {
    let d: Date;
    let fecha: String = '';
    d = new Date();
    fecha = d.getDate() + '-' + (d.getMonth() + 1) +
      '-' + d.getFullYear() + ' ' + d.getHours() + ':' +
      d.getMinutes() + ':' + d.getSeconds();

    let nombreDoc = 'reporte_' + String(d.getTime()) + '.pdf';
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
      doc.addImage(img, 'jpg', 10, 15, imgWidth, imgHeight, 'NONE', 'FAST', 0);

      doc.save(nombreDoc);
    });



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


    notifyMessageUser(userLoged){

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      })
      
      Toast.fire({
        type: 'success',
        title: `Bienvenido ${userLoged} `
      })
    }


    
    notifyMessageUpdate(){

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      })
      
      Toast.fire({
        type: 'success',
        title: `Registro actualizado `
      })
    }

    removeUnderscore(params:any): any{
      let str =  params
      let sub = str.split('_');
    
      return sub
    }



}
