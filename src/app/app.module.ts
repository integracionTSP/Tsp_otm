import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DemoMaterialModule } from './material.module';

// importar componentes 
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FormComponent } from './ordenCargaModule/components/order-form/order-form.component';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { ConstComplimentFormComponent } from './constCumplidoModule/components/const-compliment-form/const-compliment-form.component';

// añadir servicio
import { GetdataService } from './ordenCargaModule/service/getdata.service';
import { GetAuthService } from './auth/service/auth.service';

// importar el modulo http
import { HttpClientModule } from '@angular/common/http';

// importar modulos de formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// añadir modulo de rutas
import { AppRoutingModule } from './app-routing.module';

// añadir idioma español en pipes
import { LOCALE_ID } from '@angular/core';






@NgModule({
  declarations: [
    SideBarComponent,
    NavBarComponent,
    FormComponent,
    LoginComponent,
    HomeComponent,
    ConstComplimentFormComponent

    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    DemoMaterialModule,
    FormsModule, // añadir formularios y modelos
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule, // añadir el http modulo
    AppRoutingModule // modulo de rutas
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'},  GetdataService, GetAuthService],
  bootstrap: [NavBarComponent]
})
export class AppModule { }
