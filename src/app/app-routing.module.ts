import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/ordenCargaComponents/principal/principal.component';
import { FormComponent } from './components/ordenCargaComponents/form/form.component';
import { LoginComponent } from './components/ordenCargaComponents/login/login.component';
import { ConstComplimentFormComponent } from './constCumplidoModule/components/const-compliment-form/const-compliment-form.component';



const routes: Routes = [

  // login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // orden de carga
  { path: 'form', component: FormComponent },

  // constancia cumplido 
  { path: 'cumplido', component: ConstComplimentFormComponent } ,

  // homne
  { path: 'home', component: PrincipalComponent }

];

// ,{ enableTracing: true } // <-- debugging purposes only

@NgModule({


  imports: [RouterModule.forRoot(routes, {useHash:true}
    //  ,{ enableTracing: true }


  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
