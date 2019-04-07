import { Injectable } from '@angular/core';
import * as esriLoader from 'esri-loader';
import { Esri } from '../shared/Esri';
import { select, Store } from '@ngrx/store';
import { getCaptureState, getRouteData } from '../state/route/route.selectors';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../state';
import { Subject } from 'rxjs';

const modules = [
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/GeoJSONLayer',
  'esri/widgets/CoordinateConversion'
];

@Injectable({
  providedIn: 'root'
})
export class EsriService {

  private map: import ('esri/Map');
  private mapView: import ('esri/views/MapView');
  private mapDestroyed = new Subject<void>();

  constructor(private store$: Store<AppState>) { }

  initializeApi(): Promise<any> {
    const options = {
      version: '4.11',
      css: true,
    };
    return new Promise<any>((resolve, reject) => {
      esriLoader.loadScript(options).then(() => {
        esriLoader.loadModules(modules).then(m => {
          Esri.Map = m[0];
          Esri.MapView = m[1];
          Esri.GeoJsonLayer = m[2];
          Esri.CoordinateConversion = m[3];
          resolve();
        }).catch(e => {
          console.error('There was an error loading the individual Esri modules: ', e);
          reject(e);
        });
      }).catch(e => {
        console.error('There was an error loading the main Esri script: ', e);
        reject(e);
      });
    });
  }

  initializeMap(mapContainer: string, mapCenter: number[], mapZoom: number): void {
    this.map = new Esri.Map({
      basemap: 'streets'
    });
    this.mapView = new Esri.MapView({
      container: mapContainer,
      map: this.map,
      zoom: mapZoom,
      center: mapCenter
    });
    this.mapView.when(() => {
      const ccWidget = new Esri.CoordinateConversion({
        view: this.mapView
      });
      const xyFormat = ccWidget.formats.find(f => f.name === 'xy');
      if (xyFormat != null) {
        xyFormat.currentPattern = 'Y, X';
      }
      this.mapView.ui.add(ccWidget, 'top-right');

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
    const newLayer = new Esri.GeoJsonLayer({
      url,
      title: 'drive-time-layer',
      copyright: data.info.attribution
    });
    this.map.add(newLayer);
  }
}
