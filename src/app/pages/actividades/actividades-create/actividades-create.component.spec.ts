import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesCreateComponent } from './actividades-create.component';

describe('ActividadesCreateComponent', () => {
  let component: ActividadesCreateComponent;
  let fixture: ComponentFixture<ActividadesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
