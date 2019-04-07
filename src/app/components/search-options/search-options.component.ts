import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadRoutes } from '../../state/route/route.actions';
import { Observable } from 'rxjs';
import { getIsLoading, getRouteQuery } from '../../state/route/route.selectors';
import { AppState } from '../../state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss']
})
export class SearchOptionsComponent implements OnInit {

  routeIsLoading$: Observable<boolean>;
  localForm: FormGroup;

  constructor(private store$: Store<AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.setupForm();
    this.routeIsLoading$ = this.store$.pipe(select(getIsLoading));
    this.store$.pipe(select(getRouteQuery)).subscribe(data => {
      this.localForm.setValue({
        profile: data.profile,
        location: data.locations[0].join(','),
        range: data.range,
        interval: data.interval[0]
      }, { emitEvent: false });
    });
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
      debounceTime(250)
    ).subscribe(newValue => {
      if (newValue < this.localForm.get('interval').value) {
        this.localForm.get('interval').setValue(0);
      }
    });

    this.localForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(newValues => console.log(newValues));
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
