import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';

// importar el servicio
import { GetdataService } from './../../../service/ordenCargaService/getdata.service';
import {LoginService} from '../../../service/Login/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() usuarioSeleccionado = new EventEmitter();
  // variable que guarda los datos digitados
  login: any = { username: '', password: '' }

  //variable para almacenar los usuarios

  users: any;

  //habilitar btn
  disabledBtn: boolean = true;
  //Valor del check
  checkBtn: boolean = false;

  //habilitar barra horizontal

  enableNavBar: boolean;


  // inicializar el servicio en el constructor
  constructor(private GetdataService: GetdataService, private router: Router, public loginServ:LoginService) {
    this.targetMenu(false);
  }


  //funcion traer  el servicio
  getAllUser(): void {
    // traer el servicio con callback y guardar el resultado
    this.GetdataService.AllUser().subscribe(result => {

      this.users = result.response;
      console.log(result.response);

    }, error => {
      console.log(JSON.stringify(error));

    }
    );
  }

  // validar si el usuario y contraseña coincidan
  loginUser(login: any): void {

    console.log(login);
    let userCorrect: string;
    let passCorrect: string;
    for (let i in this.users) {

      if (this.users[i].idusuario == login.username && this.users[i].claveencr == login.password) {
        userCorrect = this.users[i].idusuario;
        passCorrect = this.users[i].claveencr;
        console.log('usuario correcto', userCorrect);

      }
    }
    if (userCorrect == login.username && passCorrect == login.password) {

      console.log('has iniciado session');
      this.targetMenu(true);
      this.router.navigate(['/home']);

    } else {
      console.log('incorrecto');

    }
  }
  // mostrar el boton de ingresar
  checkvalidation(): void {
    this.disabledBtn = this.checkBtn;

  }


  //inicializar
  ngOnInit() {
    this.loginServ.sendEnviableState.subscribe(response =>{
      this.enableNavBar = response;
    });
    this.getAllUser();
    
  }

  targetMenu(state){
    this.loginServ.isLogged(state);
  }

}
