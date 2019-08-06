import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './components/ordenCargaComponents/principal/principal.component';
import { FormComponent } from './components/ordenCargaComponents/form/form.component';
import { LoginComponent } from './components/ordenCargaComponents/login/login.component';



const routes: Routes = [

  // pagina principal
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'form', component: FormComponent },
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
