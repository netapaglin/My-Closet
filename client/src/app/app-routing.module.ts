import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntranceComponent } from './comp/frontpage/entrance/entrance.component';
import { LoginComponent } from './comp/frontpage/login/login.component';
import { SigninComponent } from './comp/frontpage/signin/signin.component';
import { LogoutComponent } from './comp/header/auth-menu/logout/logout.component';
import { MainComponent } from './comp/main/main.component';
import { OrderComponent } from './comp/order/order.component';
import { Page404Component } from './comp/page404/page404.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  {path:"", component:EntranceComponent,
  children: [
    {path:"login", component:LoginComponent},
    {path:"signin", component:SigninComponent},
    {path: "logout", component: LogoutComponent,canActivate:[AuthGuard] },
    {path:"", pathMatch:"full", redirectTo:"login"}
  ]
},
  {path:"main", component:MainComponent},
  {path:"order", component:OrderComponent},
  {path:"", pathMatch:"full", redirectTo:"entrance"},
  {path:"**", component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
