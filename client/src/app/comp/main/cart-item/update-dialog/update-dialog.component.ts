import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import cartItemModel from 'src/app/models/cartItem.model';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  public ItemForm: FormGroup;
  public sizes: string[] = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-large'];
  public cartroduct: cartItemModel;
  public quantityInput: FormControl
  public sizeInput: FormControl

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userData: UserService
  ) { }

  ngOnInit(): void {

    try {
      this.quantityInput = new FormControl(this.data.cartProduct.quantity);
      this.sizeInput = new FormControl(this.data.cartProduct.size);
      this.ItemForm = new FormGroup({
        quantity: this.quantityInput,
        size: this.sizeInput
      });
      console.log(this.ItemForm)
    }
    catch (err: any) {
      console.log(err);
    }
  }



  async update() {

    try {
      this.data.cartProduct.size = this.sizeInput.value;
      this.data.cartProduct.quantity = this.quantityInput.value;
      await this._userData.updateProduct(this.data.cartProduct);
      console.log("Product has been updated");

    }
    catch (err: any) {
      console.log(err);
    }
  }

}
