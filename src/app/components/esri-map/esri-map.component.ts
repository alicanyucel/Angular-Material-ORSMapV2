import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../state';
import { Store, select } from '@ngrx/store';
import { getRouteData } from '../../state/route/route.selectors';
import { filter } from 'rxjs/internal/operators/filter';
import { Esri } from '../../shared/Esri';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit, OnDestroy {

  private map: import ('esri/Map');
  private mapView: import ('esri/views/MapView');
  private componentDestroyed = new Subject<void>();

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.map = new Esri.Map({
      basemap: 'streets'
    });
    this.mapView = new Esri.MapView({
      container: 'esri-map',
      map: this.map,
      zoom: 10,
      center: [-83.4255176, 42.432238]
    });
    this.mapView.when(() => {
      this.store$.pipe(
        select(getRouteData),
        filter(data => data != null),
        takeUntil(this.componentDestroyed)
      ).subscribe(data => this.createGeoJsonLayer(data));
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  createGeoJsonLayer(data: Openrouteservice.IsochroneResponse) {
    if (this.map.allLayers.length > 0) {
      this.map.allLayers.removeAll();
    }
    const blob = new Blob([JSON.stringify(data)]);
    const url = URL.createObjectURL(blob);
    const newLayer = new Esri.GeoJsonLayer({
      url
    });
    this.map.add(newLayer);
  }
}
