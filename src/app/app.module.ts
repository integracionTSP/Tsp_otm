import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { Routes,RouterModule } from '@angular/router';

// añadir los componentes
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { PrincipalComponent } from './principal/principal.component';

// añadir servicio
import {GetdataService} from './service/getdata.service';
// importar el modulo http
import {HttpClientModule  } from '@angular/common/http';

// importar modulos de formulario
import { FormsModule} from '@angular/forms';



// declarar las rutas
const routes: Routes = [
  // pagina principal
  {path:'', redirectTo: 'login' , pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'form', component:FormComponent},
 

]

@NgModule({
  declarations: [
    
    LoginComponent,
    FormComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //añadir el http modulo
    FormsModule, // añadir formularios y modelos
    RouterModule.forRoot(routes), // añadir las rutas
    

  ],
  providers: [GetdataService], // añadir los servicios
  bootstrap: [PrincipalComponent]
})
export class AppModule {

  
 }
