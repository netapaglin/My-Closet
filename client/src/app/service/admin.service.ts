import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ProductModel from '../models/product.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import store from '../redux/store';
import { addProductAction, updateProductAction } from '../redux/products-state';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  public async addProduct(addProduct: ProductModel): Promise<void> {

    const addedProduct = await firstValueFrom(this.http.post<any>(environment.addProductUrl, addProduct));
    console.log(addedProduct)
    console.log(addProduct)
    store.dispatch(addProductAction(addProduct));
  }

  public async editProduct(editProduct: ProductModel): Promise<void> {
    console.log(editProduct)
    const body = { name: editProduct.name, category_id: editProduct.category_id, price: editProduct.price, img: editProduct.img };
    const editedProduct = await firstValueFrom(this.http.put<any>(environment.editProductUrl + "" + editProduct.id, body));
    console.log(editedProduct)
    store.dispatch(updateProductAction(editProduct));
    return editedProduct;
  }

}
