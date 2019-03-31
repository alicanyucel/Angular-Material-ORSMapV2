import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadRoutes } from '../../state/route/route.actions';
import { Observable } from 'rxjs';
import { getIsLoading } from '../../state/route/route.selectors';
import { AppState } from '../../state';

@Component({
  selector: 'app-isochrone-ui',
  templateUrl: './isochrone-ui.component.html',
  styleUrls: ['./isochrone-ui.component.scss']
})
export class IsochroneUiComponent implements OnInit {

  routeIsLoading$: Observable<boolean>;

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.routeIsLoading$ = this.store$.pipe(select(getIsLoading));
  }

  getResults() {
    this.store$.dispatch(new LoadRoutes());
  }
}
