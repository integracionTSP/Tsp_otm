import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import * as crypto from 'crypto-js';
// importar el servicio
import { GetAuthService } from '../../service/auth.service';
import { LoginService } from '../../service/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  // variable que guarda los datos digitados
  login: any = { username: '', password: '', email: '' }
  // todos usuarios traidos del servicio
  users: any ;

  //habilitar btn
  disabledBtn: boolean = true;
  //Valor del check
  checkBtn: boolean = false;

  //habilitar barra horizontal

  enableNavBar: boolean;






  // inicializar el servicio en el constructor
  constructor(private GetAuthService: GetAuthService, private router: Router, public loginServ: LoginService, public FormBuilder:FormBuilder) {
    this.targetMenu(false);
   

    this.formLogin = this.FormBuilder.group({

      username:['', [Validators.required] ],
      password:['', [Validators.required] ]


    });

  }

  
  //alertas de mensaje de error
  alertMessageError(messageError: string) {
    Swal.fire({
      type: 'error',
      title: 'Alerta',
      text: messageError,
      html: messageError,
      customClass: {
        popup: 'animated tada'
      }

    })
  }

 notifyMessageUser(userLoged){

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
  })
  
  Toast.fire({
    type: 'success',
    title: `Bienvenido ${userLoged} `
  })
}
  

  //funcion traer  el servicio
  getAllUser(): void {
    // traer el servicio con callback y guardar el resultado
    this.GetAuthService.AllUser().subscribe(result => {

      this.users = result.response;
      //console.log(this.users);
      

    }, error => {
      console.log(JSON.stringify(error));

    }
    );
  }

  // validar si el usuario y contraseña coincidan 
  loginUser(login: any) {

    let userUpper = login.username.toString().toUpperCase()
    let userCorrect: string;
    let passCorrect: string;
    let email: string;
    // Encrypt password provide for user
    let pwd = crypto.SHA512(login.password);
 

    //console.log(this.formLogin.value);
    
   
  
// recorrer  a todos los usuarios 
    for (let i in this.users) {

      if (this.users[i].idusuario == userUpper && this.users[i].angular_password == pwd) {
        userCorrect = this.users[i].idusuario;
        passCorrect = this.users[i].angular_password;
        email = this.users[i].email;
        //console.log('usuario correcto', userCorrect);

      }
    }


    if (userCorrect == userUpper && passCorrect == pwd) {
      login.email = email;
      localStorage.setItem('user', JSON.stringify(login));
      this.notifyMessageUser(userCorrect);
      //console.log('has iniciado session');
      this.targetMenu(true);
      this.router.navigate(['/home']);
      
    } else {
      localStorage.setItem('user', '{"username":"","password":"","email":""}');
      this.alertMessageError('Usuario y/o contraseña incorrecto');
     // console.log('usuario y/o contraseña incorrecto');

    }
  }
  // mostrar el boton de ingresar
  checkvalidation(): void {
    this.disabledBtn = this.checkBtn;

  }


  //inicializar
  ngOnInit() {
    this.loginServ.sendEnviableState.subscribe(response => {
      this.enableNavBar = response;
    });
    this.getAllUser();

    console.log('environment:',environment['name']);
    
  }

  targetMenu(state) {
    this.loginServ.isLogged(state);
  }

}
