import { RouteActions, RouteActionTypes } from './route.actions';

export interface RouteState {
  isLoading: boolean;
  isochrones: Openrouteservice.IsochroneResponse;
  routeQuery: Openrouteservice.IsochroneQueryRequest;
}

export const initialState: RouteState = {
  isLoading: false,
  isochrones: null,
  routeQuery: {
    range_type: 'time',
    locations: [[-83.4255176, 42.432238]], // these are in long/lat pairs, not lat/long pairs.
    location_type: 'start',
    profile: 'driving-car',
    range: 900, // time in seconds
    interval: [300], // this number is used to split up the above number into regions
    attributes: ['area', 'total_pop']
  }
};

export function routeReducer(state = initialState, action: RouteActions): RouteState {
  switch (action.type) {
    case RouteActionTypes.UpdateQuery:
      return {
        ...state,
        routeQuery: {
          ...state.routeQuery,
          ...action.payload.changes
        }
      };
    case RouteActionTypes.RoutesLoaded:
      return {
        ...state,
        isochrones: {
          ...action.payload.response
        },
        isLoading: false,
      };
    case RouteActionTypes.RoutesFailed:
      return {
        ...state,
        isochrones: initialState.isochrones,
        isLoading: initialState.isLoading,
      };
    case RouteActionTypes.LoadRoutes:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
