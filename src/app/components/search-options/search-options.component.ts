import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { AppState } from '../../state';
import { LoadRoutes, RouteQueryChanges, UpdateQuery } from '../../state/route/route.actions';
import { getIsLoading, getRouteQuery } from '../../state/route/route.selectors';

interface FormData {
  profile: Openrouteservice.ProfileType;
  location: string;
  range: number;
  interval: number;
}

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

  static queryToForm(query: Openrouteservice.IsochroneQueryRequest): FormData {
    let locationValue = '';
    if (query.locations[0].length === 2) {
      locationValue = [query.locations[0][1], query.locations[0][0]].join(', ');
    }
    return {
      profile: query.profile,
      location: locationValue,
      range: query.range,
      interval: query.interval[0]
    };
  }

  static formToQuery(formValues: FormData): RouteQueryChanges {
    const pair = formValues.location.split(',');
    let locationQuery: number[] = [];
    if (pair.length === 2) {
      locationQuery = [Number(pair[1].trim()), Number(pair[0].trim())];
    }
    const intervalValue = Math.min(formValues.interval, formValues.range);
    return {
      profile: formValues.profile,
      range: formValues.range,
      interval: [intervalValue],
      locations: [locationQuery]
    };
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

    this.routeIsLoading$.pipe(
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(isLoading => this.setFormDisabled(isLoading));

    this.localForm.valueChanges.pipe(
      debounceTime(500),
      map(newValues => SearchOptionsComponent.formToQuery(newValues)),
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(changes => this.store$.dispatch(new UpdateQuery({ changes })));

    this.routeQuery$.pipe(
      map(newQuery => SearchOptionsComponent.queryToForm(newQuery)),
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(values => this.localForm.setValue(values, { emitEvent: false }));
  }

  private setFormDisabled(isDisabled: boolean): void {
    if (isDisabled) {
      this.localForm.disable({ emitEvent: false });
    } else {
      this.localForm.enable({ emitEvent: false });
    }
  }

  getResults() {
    this.store$.dispatch(new LoadRoutes());
  }

  secondsToMinutes(value: number | null): number {
    return (value || 0) / 60;
  }
}
