import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePueblosComponent } from './create-pueblos.component';

describe('CreatePueblosComponent', () => {
  let component: CreatePueblosComponent;
  let fixture: ComponentFixture<CreatePueblosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePueblosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePueblosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
