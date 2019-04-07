import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadRoutes, UpdateQuery } from '../../state/route/route.actions';
import { Observable, Subject } from 'rxjs';
import { getIsLoading, getRouteQuery } from '../../state/route/route.selectors';
import { AppState } from '../../state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss']
})
export class SearchOptionsComponent implements OnInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<void>();

  routeIsLoading$: Observable<boolean>;
  routeQuery$: Observable<Openrouteservice.IsochroneQueryRequest>;
  localForm: FormGroup;

  constructor(private store$: Store<AppState>,
              private fb: FormBuilder) { }

  static locationToDisplay(yxPair: number[]): string {
    if (yxPair.length !== 2) {
      return '';
    }
    return [yxPair[1], yxPair[0]].join(', ');
  }

  static displayToLocation(xyPair: string): number[] {
    const pair = xyPair.split(',');
    if (pair.length !== 2) {
      return [];
    }
    return [Number(pair[1].trim()), Number(pair[0].trim())];
  }

  ngOnInit() {
    this.routeIsLoading$ = this.store$.pipe(select(getIsLoading));
    this.routeQuery$ = this.store$.pipe(select(getRouteQuery));
    this.setupForm();
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed$.next();
  }

  private setupForm(): void {
    this.localForm = this.fb.group({
      profile: null,
      location: null,
      range: null,
      interval: null
    });

    // If the range drops below the current interval, reset interval to 0
    this.localForm.get('range').valueChanges.pipe(
      debounceTime(250),
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(newValue => {
      if (newValue < this.localForm.get('interval').value) {
        this.localForm.get('interval').setValue(0);
      }
    });

    this.localForm.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(newValues => this.store$.dispatch(new UpdateQuery({ changes: {
        interval: [newValues.interval],
        profile: newValues.profile,
        range: newValues.range,
        locations: [SearchOptionsComponent.displayToLocation(newValues.location)]
    }})));

    this.routeIsLoading$.pipe(
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(isLoading => {
      if (isLoading) {
        this.localForm.disable({ emitEvent: false });
      } else {
        this.localForm.enable({ emitEvent: false });
      }
    });

    this.routeQuery$.pipe(
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(data => {
      this.localForm.setValue({
        profile: data.profile,
        location: SearchOptionsComponent.locationToDisplay(data.locations[0]),
        range: data.range,
        interval: data.interval[0]
      }, { emitEvent: false });
    });
  }

  getResults() {
    this.store$.dispatch(new LoadRoutes());
  }

  secondsToMinutes(value: number | null): number {
    if (value == null) {
      return 0;
    } else {
      return value / 60;
    }
  }
}
