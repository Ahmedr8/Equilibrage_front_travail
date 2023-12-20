/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DepotComponent } from './Depot.component';

describe('DepotComponent', () => {
  let component: DepotComponent;
  let fixture: ComponentFixture<DepotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
