import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/ordenCargaComponents/appComp/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTreeModule} from '@angular/cdk/tree';
import { DemoMaterialModule } from './material.module';
import { NavBarComponent } from './components/ordenCargaComponents/nav-bar/nav-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { CarbonComponent } from './components/ordenCargaComponents/carbon/carbon.component';
import { FormComponent } from './components/ordenCargaComponents/form/form.component';
import { LoginComponent } from './components/ordenCargaComponents/login/login.component';
import { PrincipalComponent } from './components/ordenCargaComponents/principal/principal.component';

// añadir servicio
import {GetdataService} from './service/ordenCargaService/getdata.service';

// importar el modulo http
import {HttpClientModule  } from '@angular/common/http';

// importar modulos de formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [

    // pagina principal
    {path:'', redirectTo: 'login' , pathMatch: 'full'},
    {path:'login', component:LoginComponent},
    {path:'form', component:FormComponent},
    { path: 'carbon', component: CarbonComponent }
  
  ]

  @NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarbonComponent,
    FormComponent,
    LoginComponent,
    PrincipalComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTreeModule,
    DemoMaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule, // añadir formularios y modelos
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule //añadir el http modulo
  ],
  providers: [GetdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
