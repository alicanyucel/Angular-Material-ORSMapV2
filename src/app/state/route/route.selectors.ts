import { AppState } from '../index';
import { createSelector } from '@ngrx/store';

const routeSlice = (state: AppState) => state.route;
export const getRouteQuery = createSelector(routeSlice, state => state.routeQuery);
export const getIsLoading = createSelector(routeSlice, state => state.isLoading);
