import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ShowSimpleMessage, UpdateQuery } from '../state/route/route.actions';
import { getCaptureState, getRouteData } from '../state/route/route.selectors';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../state';
import { Subject } from 'rxjs';
import * as esri from '@val/esri-loader';

@Injectable({
  providedIn: 'root'
})
export class EsriService {

  private map: esri.Map;
  private mapView: esri.MapView;
  private mapDestroyed = new Subject<void>();

  constructor(private store$: Store<AppState>) { }

  initializeMap(mapContainer: string, mapCenter: number[], mapZoom: number): void {
    this.map = new esri.Map({
      basemap: 'streets'
    });
    this.mapView = new esri.MapView({
      container: mapContainer,
      map: this.map,
      zoom: mapZoom,
      center: mapCenter
    });
    this.mapView.when(() => {
      const ccWidget = new esri.CoordinateConversion({
        view: this.mapView
      });
      // change the pattern to strip off the degrees symbol, and match what the search ui expects
      ccWidget.formats.find(f => f.name === 'xy').currentPattern = 'Y, X';
      this.mapView.ui.add(ccWidget, 'top-right');
      this.mapView.on('click', (e) => {
        if (e.button === 2) {
          const x = Number(e.mapPoint.longitude.toFixed(6));
          const y = Number(e.mapPoint.latitude.toFixed(6));
          this.store$.dispatch(new UpdateQuery({ changes: { locations: [[x, y]] } }));
          this.store$.dispatch(new ShowSimpleMessage({ message: 'Site coordinates updated.'}));
        }
      });

      this.store$.pipe(
        select(getRouteData),
        takeUntil(this.mapDestroyed)
      ).subscribe(data => this.createGeoJsonLayer(data));

      this.store$.pipe(
        select(getCaptureState),
        takeUntil(this.mapDestroyed)
      ).subscribe(state => ccWidget.mode = (state ? 'capture' : 'live'));
    });
  }

  tearDownMap(): void {
    this.mapDestroyed.next();
    this.mapView = null;
    this.map = null;
  }

  private createGeoJsonLayer(data: Openrouteservice.IsochroneResponse): void {
    this.map.layers.removeAll();
    if (data == null) return;
    const blob = new Blob([JSON.stringify(data)]);
    const url = URL.createObjectURL(blob);
    const newLayer = new esri.GeoJsonLayer({
      url,
      title: 'drive-time-layer',
      copyright: data.info.attribution
    });
    this.map.add(newLayer);
  }
}
