import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ProductModel from 'src/app/models/product.model';
import { EditItemService } from 'src/app/service/edit-item.service';
import { GeneralService } from 'src/app/service/general.service';
import { OrderButtonService } from 'src/app/service/order-button.service';
import { UserService } from 'src/app/service/user.service';
import store from 'src/app/redux/store';
import cartItemModel from 'src/app/models/cartItem.model';
import { CartItemsService } from 'src/app/service/cart-items.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})

export class ProductItemComponent implements OnInit {
  public isAdmin: boolean = ((JSON.parse(localStorage['user-info'])).admin) == 1
  public ItemForm: FormGroup;
  public displayAddButton: boolean = true;
  public sizes: string[] = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-large'];
  public cartProductArr: cartItemModel[]
  public errMsg;
  public orderButton: boolean

  @Input() public product: ProductModel;
  @Input() public cartItemArr: any[];

  constructor(
    public _data: GeneralService,
    public _userData: UserService,
    private _editItemService: EditItemService,
    public _order: OrderButtonService,
    public _cartItemsService: CartItemsService
  ) { }

  ngOnInit(): void {
    store.subscribe(() => {
      const productsId = (store.getState().productsCartState.cartProducts.map(p => p.id));
      this.displayAddButton = productsId.indexOf(this.product.id) == -1;
    })
    this.ItemForm = new FormGroup({
      quantity: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required])
    })
  }

  get quantity() { return this.ItemForm.get('quantity') }
  get size() { return this.ItemForm.get('size') }

  async add() {
    if (this.ItemForm.invalid) {
      this.errMsg = "Please choose quantity and size"
      return
    }
    try {
      const addedProduct = { "product_id": this.product.id }
      const currentProduct = this.product
      const formValue = this.ItemForm.value
      const addProductInfo = { ...addedProduct, ...formValue, ...currentProduct };
      await this._userData.addProductToCart(addProductInfo)
      this._order.button = this.orderButton
    } catch (err: any) {
      console.log(err)
    }
  }

  edit() {
    this._editItemService.updateProduct(this.product);
  }

}





