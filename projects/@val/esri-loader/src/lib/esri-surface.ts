/* tslint:disable:only-arrow-functions */
import * as esriLoader from 'esri-loader';

// tslint:disable-next-line:variable-name
export const __bootstrapper = {
  options: {
    version: '4.11',
    css: true
  },
  modules: [
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/GeoJSONLayer',
    'esri/widgets/CoordinateConversion'
  ],
  async init() {
    try {
      await esriLoader.loadScript(__bootstrapper.options);
      const asyncModules = await esriLoader.loadModules(__bootstrapper.modules);
      __bootstrapper.load(asyncModules);
    } catch (e) {
      console.error('There was an error during the Esri Api bootstrapping process', e);
    }
  },
  load(modules: any[]): void {
    Map = modules[0];
    MapView = modules[1];
    GeoJsonLayer = modules[2];
    CoordinateConversion = modules[3];
  }
};

export type Map = import ('esri/Map');
export let Map: typeof import ('esri/Map');

export type MapView = import ('esri/views/MapView');
export let MapView: typeof import ('esri/views/MapView');

export type GeoJsonLayer = import ('esri/layers/GeoJSONLayer');
export let GeoJsonLayer: typeof import ('esri/layers/GeoJSONLayer');

export type CoordinateConversion = import ('esri/widgets/CoordinateConversion');
export let CoordinateConversion: typeof import ('esri/widgets/CoordinateConversion');
