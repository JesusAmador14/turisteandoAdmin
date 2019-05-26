import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGastronomiaComponent } from './create-gastronomia.component';

describe('CreateGastronomiaComponent', () => {
  let component: CreateGastronomiaComponent;
  let fixture: ComponentFixture<CreateGastronomiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGastronomiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGastronomiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
