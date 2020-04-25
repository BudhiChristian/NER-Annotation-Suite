import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtFileComponent } from './txt-file.component';

describe('TxtFileComponent', () => {
  let component: TxtFileComponent;
  let fixture: ComponentFixture<TxtFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
