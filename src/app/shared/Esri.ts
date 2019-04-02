export interface EsriModules {
  Map: typeof __esri.Map;
  MapView: typeof __esri.MapView;
  GeoJsonLayer: typeof __esri.GeoJSONLayer;
}

export const Esri: Partial<EsriModules> = {};
