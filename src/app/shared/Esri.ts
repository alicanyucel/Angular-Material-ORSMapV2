export interface EsriModules {
  Map: typeof import ('esri/Map');
  MapView: typeof import ('esri/views/MapView');
  GeoJsonLayer: typeof import ('esri/layers/GeoJSONLayer');
  CoordinateConversion: typeof import ('esri/widgets/CoordinateConversion');
}

export const Esri: Partial<EsriModules> = {};
