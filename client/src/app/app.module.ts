import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comp/header/header.component';
import { EntranceComponent } from './comp/frontpage/entrance/entrance.component';
import { LoginComponent } from './comp/frontpage/login/login.component';
import { SigninComponent } from './comp/frontpage/signin/signin.component';
import { MainComponent } from './comp/main/main.component';
import { CartComponent } from './comp/main/cart/cart.component';
import { ManageComponent } from './comp/main/manage/manage.component';
import { ProductsComponent } from './comp/main/products/products.component';
import { CartItemComponent } from './comp/main/cart-item/cart-item.component';
import { ProductItemComponent } from './comp/main/product-item/product-item.component';
import { EditComponent } from './comp/main/manage/edit/edit.component';
import { AddComponent } from './comp/main/manage/add/add.component';
import { OrderComponent } from './comp/order/order.component';
import { OrderCartComponent } from './comp/order/order-cart/order-cart.component';
import { ShippingComponent } from './comp/order/shipping/shipping.component';
import { Page404Component } from './comp/page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtInterceptor } from './service/jwt.interceptor';
import { AuthMenuComponent } from './comp/header/auth-menu/auth-menu.component';
import { LogoutComponent } from './comp/header/auth-menu/logout/logout.component';
import { UpdateDialogComponent } from './comp/main/cart-item/update-dialog/update-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmAlertComponent } from './comp/order/confirm-alert/confirm-alert.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EntranceComponent,
    LoginComponent,
    SigninComponent,
    MainComponent,
    CartComponent,
    ManageComponent,
    ProductsComponent,
    CartItemComponent,
    ProductItemComponent,
    EditComponent,
    AddComponent,
    OrderComponent,
    OrderCartComponent,
    ShippingComponent,
    Page404Component,
    AuthMenuComponent,
    LogoutComponent,
    UpdateDialogComponent,
    ConfirmAlertComponent

    // NgInitDirective


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule




  ],
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  },{provide: DateAdapter, useClass: NativeDateAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
