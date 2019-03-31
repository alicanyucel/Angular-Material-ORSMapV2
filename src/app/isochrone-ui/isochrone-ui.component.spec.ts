import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsochroneUiComponent } from './isochrone-ui.component';

describe('IsochroneUiComponent', () => {
  let component: IsochroneUiComponent;
  let fixture: ComponentFixture<IsochroneUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsochroneUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsochroneUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
