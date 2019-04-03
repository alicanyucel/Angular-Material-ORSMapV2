import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadRoutes } from '../../state/route/route.actions';
import { Observable } from 'rxjs';
import { getIsLoading } from '../../state/route/route.selectors';
import { AppState } from '../../state';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss']
})
export class SearchOptionsComponent implements OnInit {

  routeIsLoading$: Observable<boolean>;

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.routeIsLoading$ = this.store$.pipe(select(getIsLoading));
  }

  getResults() {
    this.store$.dispatch(new LoadRoutes());
  }
}
