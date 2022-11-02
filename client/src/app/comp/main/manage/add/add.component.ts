import { Component, OnInit} from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import ProductModel from 'src/app/models/product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/service/general.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public productsCategoryArr: any = []
  public product: ProductModel
  public addForm: FormGroup;
  public errMsg;


  constructor(
    public _adminData: AdminService,
    public fb: FormBuilder,
    private _data: GeneralService) { }

  async getAllCategories() {
    this.productsCategoryArr = await this._data.getCategory()
    console.log(this.productsCategoryArr)
  }

  ngOnInit() {
    this.getAllCategories();
    try {
      this.addForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        category_id: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        img: new FormControl('', [Validators.required]),
      });
    }
    catch (err: any) {
      console.log(err);
    }
  }

  async add() {
    try {
      const addedProduct = await this._adminData.addProduct(this.addForm.value);
      console.log(addedProduct)
    }
    catch (err: any) {
      console.log(err)
    }
    this.addForm.reset()
    alert('Item added')
  }

  get name() { return this.addForm.get('name'); }
  get category() { return this.addForm.get('category'); }
  get price() { return this.addForm.get('price'); }
  get img() { return this.addForm.get('img'); }

}
