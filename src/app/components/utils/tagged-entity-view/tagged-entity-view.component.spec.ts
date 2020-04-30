import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedEntityViewComponent } from './tagged-entity-view.component';

describe('TaggedEntityViewComponent', () => {
  let component: TaggedEntityViewComponent;
  let fixture: ComponentFixture<TaggedEntityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedEntityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedEntityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
