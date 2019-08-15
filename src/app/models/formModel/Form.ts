import { GetdataService } from "../../service/ordenCargaService/getdata.service";
export class FormModel {
    // Placa y Conductor
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

    //Mensajes de Alerta
    AlertMessages: number[] = [];

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
    },
    {
        id: 6,
        message: 'No existe placa en el sistema'
    },
    {
        id: 7,
        message: 'No existe Conductor en el sistema'
    }

    ];


    constructor(public GetdataService: GetdataService) {
    }

    //Cargan los datos de powerUnit
     getPowerUnit(powerUnit:any) {
         this.GetdataService.powerValid(powerUnit).subscribe(result => {
            this.dataPowerValid = result.response;
            if(result.response != null){
            this.powerTecnoDate = this.dataPowerValid[0].vence_tecnomecanica;
            this.powerSoatDate = this.dataPowerValid[0].vence_soat;
            this.powerStatus = this.dataPowerValid[0].is_active;
        }else {
            this.AlertMessages.push(6);
            }
        }, error => {
            console.log(JSON.stringify(error));

        });
    }



    // Valida Soat --- Retorna True si el SOAT esta activo
    SoatValid(): Boolean {
        if (this.dataPowerValid[0].vence_soat < this.dataPowerValid[0].fecha_actual) {
            this.AlertMessages.push(3)
            return false
        }else{
            return true
        }
    }

    // Valida Tecnomecanica Retorna True si el Tecnomecanica esta activo
    TecnoValid(): Boolean {
        if (this.powerTecnoDate < this.dataPowerValid[0].fecha_actual) {
            this.AlertMessages.push(2);
            return false 
        }else{
            return true
        }
    }

    //Valida Placa Activa Retorna True si esta activo
    PowerStatusValid(): Boolean {
        if (this.powerStatus == 'N') {
            this.AlertMessages.push(1);
            return false
        }else{
            return true
        }
    }

    //Datos conductor
    getDriver(driver:any): void {
        this.GetdataService.driverValid(driver).subscribe(result => {
            this.dataDriverValid = result.response;
            if(result.response != null){
            this.driverName = this.dataDriverValid[0].driver_full_name;
            this.driverlicDate = this.dataDriverValid[0].expiracion_licencia;
            this.driverStatus = this.dataDriverValid[0].is_active;
            }else{
            this.AlertMessages.push(7);

            }
        }, error => {
            console.log(JSON.stringify(error));

        }
        );
    }

    //Valida Licencia Retorna True si la licencia esta activa
    licenceValid(): Boolean {
        if (this.driverlicDate < this.dataDriverValid[0].fecha_actual) {
            this.AlertMessages.push(4);
            return false
        }else{
            return true
        }
    }
    //Valida Driver Activo Retorna True si el conductor esta activo
    driverStatusValid():Boolean {
        if (this.driverStatus == 'N') {
            this.AlertMessages.push(0);
            return false
        }else{
            return true
        }
    }

    // Valida Driver General 
    async driverValid(driver:any){
        
            await this.getDriver(driver);
            let licence = this.licenceValid();
            let status = this.driverStatusValid();

            if(licence && status){
                return true
            }else{
                return false
            }
        }

    //Valida placa General
    async powerValid(power){

        await this.getPowerUnit(power);
        let soat = this.SoatValid();
        let tecno = this.TecnoValid();
        let status = this.PowerStatusValid();
      

        if(soat && tecno && status ){
            return true
        }else{
           return false
        }
    }
}