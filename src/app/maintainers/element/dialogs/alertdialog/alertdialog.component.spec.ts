import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertdialogComponent } from './alertdialog.component';

describe('AlertdialogComponent', () => {
  let component: AlertdialogComponent;
  let fixture: ComponentFixture<AlertdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
