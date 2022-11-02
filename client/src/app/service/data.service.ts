import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  serversArr = []

  async getServers() {
    const res = await fetch('http://localhost:1000/')
    const data = await res.json()
    this.serversArr = data
  }


}
