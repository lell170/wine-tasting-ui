import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineEditDialogComponent } from './wine-edit-dialog.component';

describe('WineEditDialogComponent', () => {
  let component: WineEditDialogComponent;
  let fixture: ComponentFixture<WineEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
