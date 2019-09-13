export class UtilMessage {


    listMessageError = [{
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
      },
      {
        id: 9,
        message: 'No hay coincidencias con la busqueda'
      },
      {
        id: 10,
        message: 'Validando credenciales...'
      },

      ];


    
  
      getMessageID(listMessageError: any[], id: number): string {
        let mess = '';
        listMessageError.forEach(element => {
          if (element.id == id) {
            mess = element.message
          }
        });
        return mess
      }
   

  
}