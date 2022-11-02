import { Component, Input, OnInit } from '@angular/core';
import cartItemModel from 'src/app/models/cartItem.model';
import { UserService } from 'src/app/service/user.service';
import {MatDialog,} from '@angular/material/dialog';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';



@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  public size:string
  public quantity:number

  @Input()
  public product: cartItemModel

  @Input()
  public cartStatus:any


  constructor(
    private _userData:UserService,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.size = this.product.size
    this.quantity = this.product.quantity
  }

   async removeFromCart(){
    try {
      const ok = confirm("Are you sure?");
      if(!ok) return;
      await this._userData.deleteProductFromCart(this.product.id)
      console.log("Product has been deleted");
  }
  catch(err: any) {
  }
}

  updateCartProduct(): void {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      height: '320px',
      data: {cartProduct:this.product},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
