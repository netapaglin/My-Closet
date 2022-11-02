import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent   {

  constructor(
    public _data: GeneralService
  ) { }

}
