import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationUserComponent } from './validation-user.component';
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ValidationUserComponent', () => {
  let component: ValidationUserComponent;
  let fixture: ComponentFixture<ValidationUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationUserComponent ],
      imports:[RouterModule,
        RouterTestingModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
