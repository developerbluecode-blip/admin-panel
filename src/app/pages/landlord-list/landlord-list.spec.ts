import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordList } from './landlord-list';

describe('LandlordList', () => {
  let component: LandlordList;
  let fixture: ComponentFixture<LandlordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandlordList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandlordList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
