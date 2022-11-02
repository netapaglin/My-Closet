import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';



@Component({
  selector: 'app-logout',
  template: ""
})
export class LogoutComponent implements OnInit {

  constructor(public _data: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this._data.logout();
    this.router.navigateByUrl("/");
  }

}
