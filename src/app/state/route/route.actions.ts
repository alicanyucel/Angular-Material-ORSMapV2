import { Action } from '@ngrx/store';

export enum RouteActionTypes {
  LoadRoutes = '[Route] Load Routes',
  RoutesLoaded = '[Route] Routes Loaded',
  RoutesFailed = '[Route] Routes Failed'
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

export type RouteActions =
  LoadRoutes |
  RoutesLoaded |
  RoutesFailed
  ;
