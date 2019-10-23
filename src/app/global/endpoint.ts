import { environment } from 'src/environments/environment';



export class EndPoints {

    ordenCarga = environment['urlPrincipal'] + 'ordenCarga/';
    mail = environment['urlPrincipal'] + 'mail/';
    constCumplido = environment['urlPrincipal'] + 'constCumplido/';
    auth = environment['urlPrincipal'] + 'auth/';
    genPedido = environment['urlPrincipal'] + 'genPedido/';  
    chequeOTM =  environment['urlPrincipal'] + 'chequeOTM/';  


}
