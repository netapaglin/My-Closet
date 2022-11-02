import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { GeneralService } from 'src/app/service/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit , OnDestroy{

  public user: UserModel;
  private unsubscribe: Unsubscribe;


  constructor(
    public _data: GeneralService,
  ) { }

     ngOnInit(): void {
        this.user = store.getState().authState.user;
        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }


}
