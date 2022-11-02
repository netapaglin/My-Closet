import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import OrderModel from 'src/app/models/order.model';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmAlertComponent } from '../confirm-alert/confirm-alert.component';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  public orderForm: FormGroup;
  public orderCart: OrderModel;
  public errMsg;

  public cityName: string[] = ['Tel-Aviv', 'Jerusalem', 'Haifa', 'Ramat-gan', 'Petach-tikva',
    'Eilat', 'Natanya', 'Bat-Yam', 'Givatayim', 'Afula'];

  public unavailableDates: []
  @Input() cartArr
  @Input() price
  public cartToOrder: any;
  public newDatesTest = [];

  constructor(
    public _userData: UserService,
    public fb: FormBuilder,
    private dialog: MatDialog,
  ) { }


  async ngOnInit() {
    this.unavailableDates = await this._userData.orderDates()
    for (let i = 0; i < this.unavailableDates.length; i++) {
      let date = new Date(this.unavailableDates[i]);
      this.newDatesTest.push((date.toLocaleDateString()))
    }

    this.cartToOrder = await this._userData.cartInfo()
    console.log('this.cartToOrder')
    console.log(this.cartToOrder)
    console.log('this.cartArr')
    console.log(this.cartArr)
    this.initForm();
  }

  async initForm() {
    try {
      this.orderForm = await new FormGroup({
        city: new FormControl((this.cartToOrder[0].city), [Validators.required]),
        street: new FormControl((this.cartToOrder[0].street), [Validators.required, Validators.minLength(2)]),
        arrival_date: new FormControl('', [Validators.required]),
        creditcard: new FormControl('', [Validators.required, Validators.min(4)])
      });
    }
    catch (err: any) {
      console.log(err);
    }
  }

  async order() {
    this.orderCart = this.orderForm.value
    console.log(this.orderCart)
    let d = new Date(this.orderCart.arrival_date);
    console.log(d);
    const finalPrice = { "final_price": this.price }
    const orederCartInfo = { ...finalPrice, ...this.orderCart };

    try {
      await this._userData.orderCart(orederCartInfo);
    }
    catch (err: any) {
      console.log(err)
    }
    this.openDialog()
    this.orderForm.reset()
  }

  get city() { return this.orderForm.get('city'); }
  get street() { return this.orderForm.get('street'); }
  get arrival_date() { return this.orderForm.get('arrival_date'); }
  get creditcard() { return this.orderForm.get('creditcard'); }

  openDialog(): void {
    this.orderForm.reset()
    const dialogRef = this.dialog.open(ConfirmAlertComponent, {
      width: '350px',
      data: {
        order: this.cartToOrder,
        cartProduct: this.cartArr,
        totalPrice: this.price
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public myFilter = (d: Date): boolean => {
    const day = (d || new Date()).getDay();
    const time = new Date(d).getTime();
    return !this.newDatesTest.find(x => new Date(x).getTime() == time) && day !== 5 && day !== 6;
  }
}
