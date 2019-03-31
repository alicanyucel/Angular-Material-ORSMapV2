import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { RouteActionTypes, RouteActions, RoutesLoaded, RoutesFailed } from './route.actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { RouteService } from '../../services/route.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../index';
import { getRouteQuery } from './route.selectors';
import { of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class RouteEffects {

  @Effect()
  loadRoutes$ = this.actions$.pipe(
    ofType(RouteActionTypes.LoadRoutes),
    withLatestFrom(this.store$.pipe(select(getRouteQuery))),
    switchMap(([, settings]) => this.routeService.getIsochrones(settings).pipe(
      map(response => new RoutesLoaded({ response })),
      catchError(err => of(new RoutesFailed({ err })))
    ))
  );

  @Effect({ dispatch: false })
  routesSucceeded$ = this.actions$.pipe(
    ofType(RouteActionTypes.RoutesLoaded),
    tap(() => console.log('Routes successfully loaded. (See redux devtools for more details)'))
  );

  @Effect({ dispatch: false })
  routesFailed$ = this.actions$.pipe(
    ofType(RouteActionTypes.RoutesFailed),
    tap(action => console.error('There was an error requesting the route.', action.payload.err))
  );

  constructor(private actions$: Actions<RouteActions>,
              private store$: Store<AppState>,
              private routeService: RouteService) {}
}
