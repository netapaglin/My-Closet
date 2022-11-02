import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ProductModel from 'src/app/models/product.model';
import { AdminService } from 'src/app/service/admin.service';
import { EditItemService } from 'src/app/service/edit-item.service';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public productsCategoryArr: any = []
  public editForm: FormGroup;
  public errMsg;

  selectedProduct: ProductModel;

  constructor(
    private _data: GeneralService,
    public _editItemService: EditItemService,
    public _adminData: AdminService
  ) { }

  formInit() {
    try {
      this.editForm = new FormGroup({
        name: new FormControl(this.selectedProduct.name, [Validators.required, Validators.minLength(2)]),
        category_id: new FormControl(this.selectedProduct.category_id, [Validators.required]),
        price: new FormControl(this.selectedProduct.price, [Validators.required, Validators.min(0)]),
        img: new FormControl(this.selectedProduct.img, [Validators.required]),
      });
    }
    catch (err: any) {
      console.log(err);
    }
  }

  async getAllCategories() {
    this.productsCategoryArr = await this._data.getCategory()
  }

  ngOnInit() {
    this._editItemService.selectedProduct$.subscribe((newProduct) => {
      this.selectedProduct = newProduct;
      this.formInit()
    })
    this.getAllCategories();
  }

  get name() { return this.editForm.get('name'); }
  get category_id() { return this.editForm.get('category_id'); }
  get price() { return this.editForm.get('price'); }
  get img() { return this.editForm.get('img'); }

  async changeItem() {

    try {
      const editProduct = await this._adminData.editProduct({ ...this.editForm.value, id: this.selectedProduct.id });
      console.log(editProduct)
      alert('Item editted')
    }
    catch (err: any) {
      console.log(err)
    }
    // this.editForm.reset()

  }
}

