import { Component, OnInit } from '@angular/core';
import { AppState } from '../../state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getRouteData } from '../../state/route/route.selectors';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit {

  message$: Observable<string>;

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.message$ = this.store$.pipe(
      select(getRouteData),
      filter(data => data != null),
      map(data => `${data.features.length} polygons retrieved`)
    );
  }

}
