
import { Component, Input, OnInit } from '@angular/core';
import cartItemModel from 'src/app/models/cartItem.model';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent {

  public totalPrice: number = 0
  public orderProductArr: cartItemModel[]

  @Input() cartArr
  @Input() price

}
