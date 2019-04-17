/* tslint:disable */
///<reference path="../node_modules/@types/geojson/index.d.ts"/>

declare namespace Openrouteservice {
  type ProfileType = 'driving-car' | 'driving-hgv' | 'foot-walking' | 'foot-hiking' | 'cycling-regular' | 'cycling-road' | 'cycling-mountain' | 'cycling-electric' | 'wheelchair';
  type AvoidableType = 'highways' | 'tollways' | 'ferries' | 'fords';
  type UnitType = 'm' | 'km' | 'mi';
  type AttributeType = 'area' | 'reachfactor' | 'total_pop';
  type LocationType = 'start' | 'destination';

  interface IsochroneConstructorOptions {
    api_key?: string;
    host?: string;
    api_version?: string;
  }

  interface IsochroneQueryBase extends IsochroneConstructorOptions {
    locations: number[][];
    location_type: LocationType;
    profile: ProfileType;
    range_type: 'time' | 'distance';
  }

  interface IsochroneQueryRequest extends IsochroneQueryBase {
    avoidables?: AvoidableType[];
    smoothing?: number;
    interval: number[];
    format?: 'geojson';
    range: number;
    units?: UnitType;
    area_units?: UnitType;
    attributes?: AttributeType[];
  }

  interface IsochroneQueryResponse extends IsochroneQueryBase {
    ranges: string;
    attributes: string;
  }

  interface ResponseInfo {
    attribution: string;
    engine: {
      version: string;
      build_date: string;
    };
    service: 'isochrones';
    query: IsochroneQueryResponse;
    timestamp: number;
  }

  interface IsochroneResponse extends GeoJSON.FeatureCollection<GeoJSON.Polygon> {
    info: ResponseInfo;
  }

  class Isochrones {
    constructor(args: IsochroneConstructorOptions);
    calculate: (settings: IsochroneQueryRequest) => Promise<IsochroneResponse>;
  }
}
