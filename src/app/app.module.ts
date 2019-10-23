import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DemoMaterialModule } from './material.module';

// importar componentes 
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FormComponent } from './M-ordenCargaModule/components/order-form/order-form.component';
import { LoginComponent } from './M-auth/components/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { ConstComplimentFormComponent } from './M-constCumplidoModule/components/const-compliment-form/const-compliment-form.component';
import { ChequeOtmFormComponent } from './M-operacion/components/cheque-otm-form/cheque-otm-form.component';
// añadir servicio
import { GetdataService } from './M-ordenCargaModule/service/getdata.service';
import { GetAuthService } from './M-auth/service/auth.service';
import { GetConstComplimentService } from './M-constCumplidoModule/service/const-compliment.service';
import { GetChequeOtmService } from './M-operacion/service/cheque-otm.service';
// importar el modulo http
import { HttpClientModule } from '@angular/common/http';

// importar modulos de formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// añadir modulo de rutas
import { AppRoutingModule } from './app-routing.module';

// añadir idioma español en pipes
import { LOCALE_ID } from '@angular/core';

// pagination
import {NgxPaginationModule} from 'ngx-pagination';

// modelos 
import { ConstComplimentEntity } from './M-constCumplidoModule/models/const-compliment.entity';
import { checkOTMEntity } from './M-operacion/models/operation.entity';

//utils
import { UtilFunction } from './global/utils/function.utils';
import { UtilMessage } from './global/utils/message.utils';








@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    FormComponent,
    LoginComponent,
    HomeComponent,
    ConstComplimentFormComponent,
    ChequeOtmFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    DemoMaterialModule,
    FormsModule, // añadir formularios y modelos
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule, // añadir el http modulo
    AppRoutingModule, // modulo de rutas
    NgxPaginationModule // paginacion
  ],
  providers: [/*{provide: LOCALE_ID, useValue: 'es'},*/ 
  GetdataService,
  GetAuthService,
  GetConstComplimentService,
  GetChequeOtmService,
  ConstComplimentEntity,
  checkOTMEntity,
  UtilFunction,
  UtilMessage],
  bootstrap: [NavBarComponent]
})
export class AppModule { }
