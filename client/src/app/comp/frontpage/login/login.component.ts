import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/service/general.service';
import UserModel from '../../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserModel
  public form: FormGroup;
  public errMsg;

  constructor(
    private _data: GeneralService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    try {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      });
    }
    catch (err: any) {
      console.log(err);
    }
  }


  async login() {
    try {
      const response = await this._data.login(this.form.value);
      console.log(response)
      console.log('first')
      this.router.navigateByUrl("/main");

    } catch (err:any) {
      this.errMsg = err.error.message;
      console.log(this.errMsg);
    }
  }

  get name() { return this.form.get('name'); }
  get password() { return this.form.get('password'); }

}
