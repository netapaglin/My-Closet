import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import cartItemModel from '../models/cartItem.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { addCartProductAction, deleteAllCartProductAction, deleteCartProductAction, fetchCartProductsAction, updateCartProductAction } from '../redux/cart-products-state';
import store from '../redux/store';
import OrderModel from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  public async addProductToCart(addProduct: cartItemModel): Promise<void> {
    await firstValueFrom(this.http.post<any>(environment.addProductToCartUrl, addProduct));
    store.dispatch(deleteAllCartProductAction());
    store.dispatch(addCartProductAction(addProduct));
  }


  public async deleteProductFromCart(productId: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.deleteProductFromCartUrl + productId));
    store.dispatch(deleteCartProductAction(productId));

  }

  public async updateProduct(cartProduct: cartItemModel): Promise<void> {
    const body = { size: cartProduct.size, quantity: cartProduct.quantity };
    const updatedProduct = await firstValueFrom(this.http.put<any>(environment.updateCartProductUrl + cartProduct.id, body));
    store.dispatch(updateCartProductAction(cartProduct));
    return updatedProduct;
  }


  public async getCartStatus(): Promise<any> {
    let cartStatus = await firstValueFrom(this.http.get<any>(environment.getCartStatusUrl))
    return cartStatus
  }

  public async getCartItems(): Promise<cartItemModel[]> {

    let products = [];
    products = await firstValueFrom(this.http.get<cartItemModel[]>(environment.getCartItemsUrl));
    return products;
  }

  public async emptyProductFromCart(): Promise<void> {
    await firstValueFrom(this.http.delete<void>(environment.emptyCartProductUrl));
    store.dispatch(deleteAllCartProductAction());

  }

  public async orderCart(orderCart: OrderModel): Promise<void> {
    const order = await firstValueFrom(this.http.post<any>(environment.OrderUrl, orderCart));
    console.log(order)

    return order;
  }

  public async cartInfo(): Promise<void> {
    const cartdetails = await firstValueFrom(this.http.get<any>(environment.CartOrderUrl));
    return cartdetails;

  }

  public async orderDates(): Promise<any> {
    const allOrderDates = await firstValueFrom(this.http.get<any>(environment.OrderDatesUrl));

    //***************************************** */
    const findDuplicates = (arr) => {
      let sorted_arr = arr.slice().sort();
      let results = [];
      for (let i = 0; i < sorted_arr.length - 1; i++) {
        let count = 0;
        for (let j = i + 1; j < sorted_arr.length - 1; j++) {
          if (sorted_arr[i].arrival_date == sorted_arr[j].arrival_date) {
            count = count + 1
            if (count == 1) {
              results.push(sorted_arr[i].arrival_date);
            }
          }
        }
      }
      return results;
    }

    //***************************************** */


    let res = findDuplicates(allOrderDates)

    // res.forEach(function (value) {

    //   value.format('YYYY-MM-DD')
    //   // value.toISOString().split('T')[0].split("-").reverse().join("-");
    //   console.log(value);
    // });

    // console.log(res)


    return res;

  }




}
