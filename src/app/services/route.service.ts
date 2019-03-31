import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import IsochroneResponse = Openrouteservice.IsochroneResponse;
import Isochrones = Openrouteservice.Isochrones;

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }

  getIsochrones(): Observable<IsochroneResponse> {
    const isochrones = new Isochrones({
      api_key: environment.apiKey
    });
    const result: Promise<IsochroneResponse> = isochrones.calculate({
      range_type: 'time',
      locations: [[-83.4255176, 42.432238]], // these are in long/lat pairs, not lat/long pairs.
      location_type: 'start',
      profile: 'driving-car',
      range: 900, // time in seconds
      interval: [300] // this number is used to split up the above number into regions
    });
    return from(result);
  }
}
