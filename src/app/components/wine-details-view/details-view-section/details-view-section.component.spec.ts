import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsViewSectionComponent } from './details-view-section.component';

describe('DetailsViewSectionComponent', () => {
  let component: DetailsViewSectionComponent;
  let fixture: ComponentFixture<DetailsViewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsViewSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsViewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
