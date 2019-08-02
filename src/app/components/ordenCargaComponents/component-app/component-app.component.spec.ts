import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAppComponent } from './component-app.component';

describe('ComponentAppComponent', () => {
  let component: ComponentAppComponent;
  let fixture: ComponentFixture<ComponentAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
