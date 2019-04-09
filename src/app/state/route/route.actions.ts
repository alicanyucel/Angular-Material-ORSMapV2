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
  ClearRoutes = '[Route] Clear Routes',

  UpdateQuery = '[Route] Update Query',
  ToggleCaptureState = '[Route] Toggle Capture State',

  ShowSimpleMessage = '[Route] Show Simple Message',
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

export class ClearRoutes implements Action {
    readonly type = RouteActionTypes.ClearRoutes;
}

export class UpdateQuery implements Action {
    readonly type = RouteActionTypes.UpdateQuery;
    constructor(public payload: { changes: Partial<RouteQueryChanges> }) {}
}

export class ToggleCaptureState implements Action {
    readonly type = RouteActionTypes.ToggleCaptureState;
}

export class ShowSimpleMessage implements Action {
    readonly type = RouteActionTypes.ShowSimpleMessage;
    constructor(public payload: { message: string }) {}
}

export type RouteActions =
  LoadRoutes |
  RoutesLoaded |
  RoutesFailed |
  ClearRoutes |
  UpdateQuery |
  ToggleCaptureState |
  ShowSimpleMessage
  ;
