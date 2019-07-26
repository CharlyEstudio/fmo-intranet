import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleService {

  api_key: string = 'AIzaSyApgyf9zpctTzuckqSRRYiA9wgrVKeWGFY';

  constructor(
    private http: HttpClient
  ) { }

  obtenerDireccion(gps: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${gps}&key=${this.api_key}`;
    return this.http.get(url);
  }

}
