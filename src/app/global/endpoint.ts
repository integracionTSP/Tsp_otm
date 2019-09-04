import { environment } from 'src/environments/environment';



export class EndPoints {

    ordenCarga = environment['urlPrincipal'] + 'ordenCarga/';
    mail = environment['urlPrincipal'] + 'mail/';
    constCumplido = environment['urlPrincipal'] + 'constCumplido/';
    auth = environment['urlPrincipal'] + 'auth/';


}
