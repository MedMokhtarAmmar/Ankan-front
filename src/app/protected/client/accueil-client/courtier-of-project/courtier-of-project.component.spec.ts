import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtierOfProjectComponent } from './courtier-of-project.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CourtierOfProjectComponent', () => {
  let component: CourtierOfProjectComponent;
  let fixture: ComponentFixture<CourtierOfProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],

      declarations: [ CourtierOfProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtierOfProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
