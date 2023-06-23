import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOfMessageComponent } from './user-of-message.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('UserOfMessageComponent', () => {
  let component: UserOfMessageComponent;
  let fixture: ComponentFixture<UserOfMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOfMessageComponent ],
      imports: [FormsModule,
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOfMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
