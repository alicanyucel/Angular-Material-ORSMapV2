import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-isochrone-ui',
  templateUrl: './isochrone-ui.component.html',
  styleUrls: ['./isochrone-ui.component.css']
})
export class IsochroneUiComponent implements OnInit {

  constructor(private routeService: RouteService) { }

  ngOnInit() {
  }

  getResults() {
    this.routeService.getIsochrones().pipe(take(1)).subscribe(
      response => console.log('response', response),
      err => console.error('Error', err)
    );
  }
}
