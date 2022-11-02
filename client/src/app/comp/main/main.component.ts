import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import cartItemModel from 'src/app/models/cartItem.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  public isAdmin: boolean = ((JSON.parse(localStorage['user-info'])).admin) == 1
  @Input('matBadgeColor')
  color: ThemePalette
  public cartStatus: boolean;
  public cartItems: cartItemModel[]

  constructor(private _userData: UserService) { }

  async ngOnInit() {
    this.cartStatus = await this._userData.getCartStatus()
    this.cartItems = await this._userData.getCartItems()
  }

}
