import { Component, OnInit } from '@angular/core';
import { OrdersAmount } from 'src/app/models/ordersAmount';
import { ProductAmount } from 'src/app/models/productAmount.model';
import { GeneralService } from 'src/app/service/general.service';



@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css']
})


export class EntranceComponent implements OnInit {
  public ordersAmount: OrdersAmount | undefined;
  public productAmount: ProductAmount | undefined;

  constructor(
    public _data: GeneralService
  ) { }

  private async onLoad() {
    this.ordersAmount = await this._data.getOrderssAmount();
    this.productAmount = await this._data.getProductsAmount();
  }
  ngOnInit(): void {
    this.onLoad();
  }

}
