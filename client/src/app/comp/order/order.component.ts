import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import cartItemModel from 'src/app/models/cartItem.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public totalPrice: number = 0
  public orderProductArr: cartItemModel[]
  public cartToOrder: any;

  constructor(
    private router: Router,
    private _userData: UserService
  ) { }

  toShop() {
    this.router.navigateByUrl("/main")
  }

  async ngOnInit() {
    this.orderProductArr = await this._userData.getCartItems()
    for (let p of this.orderProductArr) {
      this.totalPrice = this.totalPrice + p.price * p.quantity
    }

  }

}
