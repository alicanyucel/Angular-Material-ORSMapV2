import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routeReducer, RouteState } from './route/route.reducer';

export interface AppState {
  route: RouteState;
}

export const reducers: ActionReducerMap<AppState> = {
  route: routeReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
