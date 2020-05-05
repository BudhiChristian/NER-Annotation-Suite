import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAppendComponent } from './choose-append.component';

describe('ChooseAppendComponent', () => {
  let component: ChooseAppendComponent;
  let fixture: ComponentFixture<ChooseAppendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAppendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAppendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
