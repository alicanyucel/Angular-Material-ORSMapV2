import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOptionsComponent } from './search-options.component';

describe('IsochroneUiComponent', () => {
  let component: SearchOptionsComponent;
  let fixture: ComponentFixture<SearchOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
