import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Login from '../models/login.model';
import { OrdersAmount } from '../models/ordersAmount';
import { ProductAmount } from '../models/productAmount.model';
import Register from '../models/register.model';
import ProductModel from '../models/product.model';
import Category from '../models/category.model';
import store from '../redux/store';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fetchProductsAction } from '../redux/products-state';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {


  constructor(public http: HttpClient) { }

  public async getProductsAmount(): Promise<ProductAmount> {
    let productAmount = await firstValueFrom(this.http.get<ProductAmount>(environment.productsAmountUrl));
    return productAmount[0];
  }

  public async getOrderssAmount(): Promise<OrdersAmount> {
    let ordersAmount = await firstValueFrom(this.http.get<OrdersAmount>(environment.ordersAmountUrl));
    return ordersAmount[0]
  }

  public async login(userInfo: Login): Promise<String> {
    const token = await firstValueFrom(this.http.post<any>(environment.loginUrl, userInfo));
    console.log(token)
    store.dispatch(loginAction(token));
    return token
  }

  public async register(userRegisterInfo: Register): Promise<void> {
    const token = await firstValueFrom(this.http.post<any>(environment.registerUrl, userRegisterInfo));
    store.dispatch(registerAction(token.token));
    return token
  }

  public logout(): void {
    store.dispatch(logoutAction());
  }


  public async getAllProducts(): Promise<ProductModel[]> {
    let products = store.getState().productsState.Products;
    if (products.length === 0) {
      products = await firstValueFrom(this.http.get<ProductModel[]>(environment.getAllProductsUrl));
      store.dispatch(fetchProductsAction(products));
    }
    return products;
  }

  public async getCategory(): Promise<Category[]> {
    let categories = await firstValueFrom(this.http.get<Category[]>(environment.getCategorysUrl));
    return categories
  }

  public async getProductsCategory(categoryId: number): Promise<ProductModel[]> {
    let productsByCategory = await firstValueFrom(this.http.get<ProductModel[]>(environment.getProductsByCategoryUrl + categoryId));
    return productsByCategory
  }

}


