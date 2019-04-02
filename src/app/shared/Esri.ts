export interface EsriModules {
  Map: typeof import ('esri/Map');
  MapView: typeof import ('esri/views/MapView');
  GeoJsonLayer: typeof import ('esri/layers/GeoJSONLayer');
}

export const Esri: Partial<EsriModules> = {};
