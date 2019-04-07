import { Component, OnInit } from '@angular/core';
import { AppState } from '../../state';
import { select, Store } from '@ngrx/store';
import { ClearRoutes, ToggleCaptureState } from '../../state/route/route.actions';
import { Observable } from 'rxjs';
import { getCaptureState } from '../../state/route/route.selectors';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  captureState$: Observable<boolean>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit() {
    this.captureState$ = this.store$.pipe(select(getCaptureState));
  }

  onClear(): void {
    this.store$.dispatch(new ClearRoutes());
  }

  onBookmark(): void {
    this.store$.dispatch(new ToggleCaptureState());
  }
}
