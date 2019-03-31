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
    // @ts-ignore
    const isochrones = new Openrouteservice.Isochrones({
      api_key: environment.apiKey
    });
    isochrones.calculate({
      locations: [[-83.4255176, 42.432238]], // these are in long/lat pairs, not lat/long pairs.
      location_type: 'start',
      profile: 'driving-car',
      range: 900, // time in seconds
      interval: [300], // this number is used to split up the above number into regions
      range_type: 'time'
    })
      .then((response) => {
        console.log('response', response);
      })
      .catch((err) => {
        console.log('An error occurred: ', err);
      });
  }
}
