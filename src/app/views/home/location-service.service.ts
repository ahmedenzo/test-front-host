import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getHost(): string {
    return window.location.protocol + '//' + window.location.host;
  }
}
