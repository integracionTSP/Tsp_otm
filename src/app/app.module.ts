import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/ordenCargaComponents/appComp/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DemoMaterialModule } from './material.module';
import { NavBarComponent } from './components/ordenCargaComponents/nav-bar/nav-bar.component';

import { FormComponent } from './components/ordenCargaComponents/form/form.component';
import { LoginComponent } from './components/ordenCargaComponents/login/login.component';
import { PrincipalComponent } from './components/ordenCargaComponents/principal/principal.component';

// añadir servicio
import { GetdataService } from './service/ordenCargaService/getdata.service';

// importar el modulo http
import { HttpClientModule } from '@angular/common/http';

// importar modulos de formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// añadir modulo de rutas
import { AppRoutingModule } from './app-routing.module';






@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FormComponent,
    LoginComponent,
    PrincipalComponent
    

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
  providers: [GetdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
