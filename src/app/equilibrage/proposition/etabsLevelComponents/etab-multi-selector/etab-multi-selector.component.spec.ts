import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtabMultiSelectorComponent } from './etab-multi-selector.component';

describe('EtabMultiSelectorComponent', () => {
  let component: EtabMultiSelectorComponent;
  let fixture: ComponentFixture<EtabMultiSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtabMultiSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtabMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
