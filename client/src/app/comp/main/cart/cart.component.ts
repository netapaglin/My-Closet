import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import cartItemModel from 'src/app/models/cartItem.model';
import store from 'src/app/redux/store';
import { CartItemsService } from 'src/app/service/cart-items.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public totalPrice: number = 0
  public cartProductArr: cartItemModel[]
  public cartStatus: number
  public orderButton: boolean = false
  public showFiller = false;

  constructor(
    private _userData: UserService,
    private router: Router,
    private _cartItemsService: CartItemsService,
  ) { }

  async emptyCart() {
    await this._userData.emptyProductFromCart()
    this.orderButton = false
    this.cartStatus = 3
  }

  async ngOnInit() {

    this.cartStatus = await this._userData.getCartStatus()
    this.cartProductArr = await this._userData.getCartItems()
    if (this.cartStatus === 1 && this.cartProductArr.length > 0) {
      this.orderButton = true
    }
    for (let p of this.cartProductArr) {
      this.totalPrice = this.totalPrice + p.price * p.quantity
    }

    store.subscribe(async () => {
      this.cartProductArr = await this._userData.getCartItems()
      this.cartStatus = await this._userData.getCartStatus()
      if (this.cartProductArr.length === 0) { return }
      this._cartItemsService.cartItems = this.cartProductArr
      if (this.cartStatus === 1 && this.cartProductArr.length > 0) {
        this.orderButton = true
      } else {
        this.orderButton = false
      }
      this.totalPrice = 0
      for (let p of this.cartProductArr) {
        this.totalPrice = this.totalPrice + p.price * p.quantity
      }
    })
  }

  order() {
    this.router.navigateByUrl("/order")
  }

}
