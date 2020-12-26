import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDetailsViewComponent } from './wine-details-view.component';

describe('WineDetailsViewComponent', () => {
  let component: WineDetailsViewComponent;
  let fixture: ComponentFixture<WineDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
