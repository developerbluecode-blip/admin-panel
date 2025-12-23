import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCareTaker } from './property-care-taker';

describe('PropertyCareTaker', () => {
  let component: PropertyCareTaker;
  let fixture: ComponentFixture<PropertyCareTaker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCareTaker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCareTaker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
