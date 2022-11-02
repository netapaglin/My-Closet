import { Injectable } from '@angular/core';
import CartItemModel from '../models/cartItem.model';


@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  public cartItems:CartItemModel[]


}
