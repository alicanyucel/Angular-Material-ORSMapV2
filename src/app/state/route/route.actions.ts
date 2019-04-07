import { Action } from '@ngrx/store';
import ProfileType = Openrouteservice.ProfileType;

export interface RouteQueryChanges {
  locations: number[][];
  profile: ProfileType;
  range: number;
  interval: number[];
}

export enum RouteActionTypes {
  LoadRoutes = '[Route] Load Routes',
  RoutesLoaded = '[Route] Routes Loaded',
  RoutesFailed = '[Route] Routes Failed',

  UpdateQuery = '[Route] Update Query'
}

export class LoadRoutes implements Action {
  readonly type = RouteActionTypes.LoadRoutes;
}

export class RoutesLoaded implements Action {
    readonly type = RouteActionTypes.RoutesLoaded;
    constructor(public payload: { response: Openrouteservice.IsochroneResponse }) {}
}

export class RoutesFailed implements Action {
    readonly type = RouteActionTypes.RoutesFailed;
    constructor(public payload: { err: any }) {}
}

export class UpdateQuery implements Action {
    readonly type = RouteActionTypes.UpdateQuery;
    constructor(public payload: { changes: RouteQueryChanges }) {}
}

export type RouteActions =
  LoadRoutes |
  RoutesLoaded |
  RoutesFailed |
  UpdateQuery
  ;
