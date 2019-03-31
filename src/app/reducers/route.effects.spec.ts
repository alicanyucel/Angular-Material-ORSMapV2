import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RouteEffects } from './route.effects';

describe('RouteEffects', () => {
  let actions$: Observable<any>;
  let effects: RouteEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouteEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RouteEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
