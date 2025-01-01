/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Sync_dataComponent } from './sync_data.component';

describe('Sync_dataComponent', () => {
  let component: Sync_dataComponent;
  let fixture: ComponentFixture<Sync_dataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sync_dataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sync_dataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
