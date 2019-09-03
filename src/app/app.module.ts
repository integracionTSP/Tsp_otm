import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DemoMaterialModule } from './material.module';

// importar componentes 
import { AppComponent } from './components/ordenCargaComponents/appComp/app.component';
import { NavBarComponent } from './components/ordenCargaComponents/nav-bar/nav-bar.component';
import { FormComponent } from './components/ordenCargaComponents/form/form.component';
import { LoginComponent } from './components/ordenCargaComponents/login/login.component';
import { PrincipalComponent } from './components/ordenCargaComponents/principal/principal.component';
import { ConstComplimentFormComponent } from './constCumplidoModule/components/const-compliment-form/const-compliment-form.component';

// añadir servicio
import { GetdataService } from './service/ordenCargaService/getdata.service';

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
    AppComponent,
    NavBarComponent,
    FormComponent,
    LoginComponent,
    PrincipalComponent,
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
  providers: [{provide: LOCALE_ID, useValue: 'es'},  GetdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
