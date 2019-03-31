/* tslint:disable */

declare namespace Openrouteservice {
  type ProfileType = 'driving-car' | 'driving-hgv' | 'foot-walking' | 'foot-hiking' | 'cycling-regular' | 'cycling-road' | 'cycling-mountain' | 'cycling-electric' | 'wheelchair';
  type AvoidableType = 'highways' | 'tollways' | 'ferries' | 'fords';
  type UnitType = 'm' | 'km' | 'mi';
  type AttributeType = 'area' | 'reachfactor' | 'total_pop';
  type LocationType = 'start' | 'destination';

  interface ConstructorOptions {
    api_key: string;
    host?: string;
  }

  interface IsochroneSettings extends Partial<ConstructorOptions> {
    locations: number[][];
    profile: ProfileType;
    avoidables?: AvoidableType[];
    range_type: 'time' | 'distance';
    smoothing?: number;
    interval: number[];
    format?: 'geojson';
    range: number;
    units?: UnitType;
    area_units?: UnitType;
    attributes?: AttributeType;
    location_type: LocationType;
  }

  interface IsochroneResponse {

  }

  class Isochrones {
    constructor(args: ConstructorOptions);
    calculate: (settings: IsochroneSettings) => Promise<IsochroneResponse>;
  }
}
