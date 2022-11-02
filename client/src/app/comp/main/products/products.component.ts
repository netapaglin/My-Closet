import { Component, Input, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { GeneralService } from 'src/app/service/general.service';
import { FormGroup } from '@angular/forms';
import CartItemModel from 'src/app/models/cartItem.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productsArr: ProductModel[] = []
  public productsCategoryArr: ProductModel[] = []
  public searchResaultsArr: any = []
  public searchForm: FormGroup;
  searchValue: string = null;
  searchText: string = '';
  public select: number;
  productsInCart: number[] = [72];

  constructor(
    private _data: GeneralService
  ) { }

  @Input() public cartArr: CartItemModel[]

  async categoryNum($event) {
    this.productsCategoryArr = await this._data.getProductsCategory($event.index)
  }

  async ngOnInit() {
    this.productsArr = await this._data.getAllProducts()
    store.subscribe(async () => {
      this.productsArr = await this._data.getAllProducts()
    })
  }

  onSubmit() {
    this.searchText = this.searchValue;
    this.searchResaultsArr = []
    for (let pro of this.productsArr) {
      let search = this.searchText
      let reg = new RegExp(search, 'gi')
      if (pro.name.match(reg)) {
        this.searchResaultsArr.push(pro)
      }
    }
    this.select = 10
    this.searchValue = ''
  }
}


