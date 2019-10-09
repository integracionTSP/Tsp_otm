import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

// importar modelo
import {OperationEntity  } from './../../models/operation.entity';

@Component({
  selector: 'app-cheque-otm-form',
  templateUrl: './cheque-otm-form.component.html',
  styleUrls: ['./cheque-otm-form.component.css']
})
export class ChequeOtmFormComponent implements OnInit {

  formCheckOTM: FormGroup;

  
  

  constructor(public FormBuilder: FormBuilder,
              public operationEntity: OperationEntity,
              private router: Router) {

    this.formCheckOTM = this.FormBuilder.group({
      shipmentGID: ['', [Validators.required]]
    });
   }


   logOut() {
    localStorage.setItem('user', null);
    this.router.navigate(['/login']);
  }

   



  ngOnInit() {
  }

}
