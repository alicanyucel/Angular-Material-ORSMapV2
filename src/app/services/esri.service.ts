import { Injectable } from '@angular/core';
import * as esriLoader from 'esri-loader';
import { Esri } from '../shared/Esri';
import { select, Store } from '@ngrx/store';
import { ShowSimpleMessage, UpdateQuery } from '../state/route/route.actions';
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

type esriMap = import ('esri/Map');

@Injectable({
  providedIn: 'root'
})
export class EsriService {

  private map: esriMap;
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
    const newLayer = new Esri.GeoJsonLayer({
      url,
      title: 'drive-time-layer',
      copyright: data.info.attribution
    });
    this.map.add(newLayer);
  }
}
