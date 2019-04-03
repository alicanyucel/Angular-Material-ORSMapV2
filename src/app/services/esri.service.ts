import { Injectable } from '@angular/core';
import * as esriLoader from 'esri-loader';
import { Esri } from '../shared/Esri';
import { select, Store } from '@ngrx/store';
import { getRouteData } from '../state/route/route.selectors';
import { filter, takeUntil } from 'rxjs/operators';
import { AppState } from '../state';
import { Subject } from 'rxjs';

const modules = [
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/GeoJSONLayer'
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
      this.store$.pipe(
        select(getRouteData),
        filter(data => data != null),
        takeUntil(this.mapDestroyed)
      ).subscribe(data => this.createGeoJsonLayer(data));
    });
  }

  tearDownMap(): void {
    this.mapDestroyed.next();
    this.mapView = null;
    this.map = null;
  }

  clearLayers(): void {
    const gjLayerIndex = this.map.allLayers.findIndex(l => l.id === 'drive-time-layer');
    if (gjLayerIndex > -1) {
      this.map.allLayers.removeAt(gjLayerIndex);
    }
  }

  private createGeoJsonLayer(data: Openrouteservice.IsochroneResponse) {
    this.clearLayers();
    const blob = new Blob([JSON.stringify(data)]);
    const url = URL.createObjectURL(blob);
    const newLayer = new Esri.GeoJsonLayer({
      url,
      id: 'drive-time-layer'
    });
    this.map.add(newLayer);
  }


}
