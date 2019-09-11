

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




}
