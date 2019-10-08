import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { FormComponent } from './M-ordenCargaModule/components/order-form/order-form.component';
import { LoginComponent } from './M-auth/components/login/login.component';
import { ConstComplimentFormComponent } from './M-constCumplidoModule/components/const-compliment-form/const-compliment-form.component';



const routes: Routes = [

  // login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },

  // orden de carga
  { path: 'orden-carga', component: FormComponent },

  // constancia cumplido 
  { path: 'constancia-cumplido', component: ConstComplimentFormComponent } ,

  // 
  { path: 'cheque-otm', component: HomeComponent },

  // homne
  { path: 'home', component: HomeComponent }

];

// ,{ enableTracing: true } // <-- debugging purposes only

@NgModule({


  imports: [RouterModule.forRoot(routes, {useHash:true}
    //  ,{ enableTracing: true }


  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
