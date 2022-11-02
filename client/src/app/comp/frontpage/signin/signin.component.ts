import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/service/confirmValidator.service';
import { GeneralService } from 'src/app/service/general.service';
import UserModel from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public errMsg: String;
  public user:UserModel
  public form :FormGroup;
  public formOne :FormGroup;
  public formTwo :FormGroup;
  public formOne_step = false;
  public formTwo_step = false;
  public step = 1;

  public cityName: string[]  = ['Tel-Aviv', 'Jerusalem','Haifa','Ramat-gan','Petach-tikva',
  'Eilat', 'Natanya', 'Bat-Yam', 'Givatayim', 'Afula'];



  constructor(
    private _data:GeneralService,
    public fb:FormBuilder,
    private router: Router
  ) {  }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]  ),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]  ),
      password: new FormControl('',  [Validators.required,Validators.minLength(3)]),
      confirm_password:new FormControl('', [Validators.required],),
      id: new FormControl('', [Validators.required, Validators.minLength(6)]  ),
      email: new FormControl('', [Validators.required, Validators.email]  ),
      city: new FormControl('',  [Validators.required]),
      street: new FormControl('',  [Validators.required]),
    },{
      validators: [Validation.match('password', 'confirm_password')]
    });
  }

  async signUp(){
    if (this.form.invalid) {
      console.log('this.form.invalid')
      return;
    }
    try {
      await this._data.register(this.form.value);
      this.router.navigateByUrl("/main");
    }
    catch(err: any) {
      console.log('err')
      console.log(err.error.err);
      this.errMsg = err.error.err
    }
  }

  get id() { return this.form.get('id')}
  get email() { return this.form.get('email')}
  get street() { return this.form.get('street')}
  get city() { return this.form.get('city')}
  get password() { return this.form.get('password')}
  get name() { return this.form.get('name')}
  get last_name() { return this.form.get('last_name')}
  get confirm_password(){return this.form.get('confirm_password')}
  get formi() { return this.form.controls; }

  next(){
   this.formOne_step = true;
   if (this.name.invalid ||
    this.last_name.invalid||
    this.password.invalid ||
    this.confirm_password.invalid){ return}
     this.step++
  }

  previous(){
    this.step--
   this.formOne_step = false;
  }

}
