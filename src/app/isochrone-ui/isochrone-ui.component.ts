/* tslint:disable:no-reference */
/// <reference path="../../../types/Openrouteservice/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-isochrone-ui',
  templateUrl: './isochrone-ui.component.html',
  styleUrls: ['./isochrone-ui.component.css']
})
export class IsochroneUiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getResults() {
    const isochrones = new Openrouteservice.Isochrones({
      api_key: environment.apiKey
    });
    isochrones.calculate({
      range_type: 'time',
      locations: [[-83.4255176, 42.432238]], // these are in long/lat pairs, not lat/long pairs.
      location_type: 'start',
      profile: 'driving-car',
      range: 900, // time in seconds
      interval: [300] // this number is used to split up the above number into regions
    })
      .then((response) => {
        console.log('service response', response);
      })
      .catch((err) => {
        console.log('An error occurred: ', err);
      });
  }
}
