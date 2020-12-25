import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineTableComponent } from './wine-table.component';

describe('WineTableComponent', () => {
  let component: WineTableComponent;
  let fixture: ComponentFixture<WineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
