import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ProductModel from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class EditItemService {

  private product$ = new BehaviorSubject<any>({});
  public selectedProduct$ = this.product$.asObservable();

  updateProduct(product: ProductModel) {
    this.product$.next(product);
  }

}
