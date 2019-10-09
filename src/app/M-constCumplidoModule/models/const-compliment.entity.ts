export class ConstComplimentEntity {

  shipmentGID: string;
  powerUnitGID: string;
  driverGID: string;
  sourceLocationGID: string;
  destLocationGID: string;
  tiqueteCargue: number;
  fechaCumplido: Date;
  pesoCargue: number;
  totalWeightUOMCode: string;
  flete: number;
  anticipo: number;
  fechaConstCumplido: Date;

  length(arg0: string, length: any) {
    throw new Error('Method not implemented.');
  }

}
