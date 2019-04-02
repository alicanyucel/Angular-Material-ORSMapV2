import { Injectable } from '@angular/core';
import * as esriLoader from 'esri-loader';
import { Esri } from '../shared/Esri';

const modules = [
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/GeoJSONLayer'
];

@Injectable({
  providedIn: 'root'
})
export class EsriService {

  constructor() { }

  initialize(): Promise<any> {
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
}
