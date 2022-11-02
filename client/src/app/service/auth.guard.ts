import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(): boolean {

    if (store.getState().authState.token) {
      return true
    } else {
      alert("you are not authorized")
      return false
    }

  }

}
function admin(arg0: any, admin: any) {
  throw new Error('Function not implemented.');
}

