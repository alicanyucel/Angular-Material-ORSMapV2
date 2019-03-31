/* tslint:disable */

declare namespace Openrouteservice {
  type ProfileType = 'driving-car' | 'driving-hgv' | 'foot-walking' | 'foot-hiking' | 'cycling-regular' | 'cycling-road' | 'cycling-mountain' | 'cycling-electric' | 'wheelchair';
  type AvoidableType = 'highways' | 'tollways' | 'ferries' | 'fords';
  type UnitType = 'm' | 'km' | 'mi';
  type AttributeType = 'area' | 'reachfactor' | 'total_pop';
  type LocationType = 'start' | 'destination';

  interface Geometry {
    type: 'Polygon';
    coordinates: number[][];
  }

  interface VersionInfo {
    version: string;
    build_date: string;
  }

  interface ConstructorOptions {
    api_key: string;
    host?: string;
  }

  interface GeoJsonFeature {
    type: 'Feature';
    properties: Record<string, any>;
    geometry: Geometry;
  }

  interface IsochroneQueryBase {
    locations: number[][];
    location_type: LocationType;
    profile: ProfileType;
    range_type: 'time' | 'distance';
  }

  interface IsochroneSettings extends IsochroneQueryBase, Partial<ConstructorOptions> {
    avoidables?: AvoidableType[];
    smoothing?: number;
    interval: number[];
    format?: 'geojson';
    range: number;
    units?: UnitType;
    area_units?: UnitType;
    attributes?: AttributeType[];
  }

  interface IsochroneQueryMeta extends IsochroneQueryBase {
    ranges: string;
    attributes: string;
  }

  interface ResponseMeta {
    attribution: string;
    engine: VersionInfo;
    service: 'isochrones';
    query: IsochroneQueryMeta;
    timestamp: number;
  }

  interface IsochroneResponse {
    type: 'FeatureCollection';
    bbox: [number, number, number, number];
    features: GeoJsonFeature[];
    info: ResponseMeta;
  }

  class Isochrones {
    constructor(args: ConstructorOptions);
    calculate: (settings: IsochroneSettings) => Promise<IsochroneResponse>;
  }
}
