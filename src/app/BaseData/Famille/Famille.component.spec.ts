/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FamilleComponent } from './Famille.component';

describe('FamilleComponent', () => {
  let component: FamilleComponent;
  let fixture: ComponentFixture<FamilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
