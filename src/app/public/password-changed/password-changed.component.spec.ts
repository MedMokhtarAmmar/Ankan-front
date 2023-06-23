import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangedComponent } from './password-changed.component';
import {CourtierComponent} from "../../protected/courtier/courtier.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('PasswordChangedComponent', () => {
  let component: PasswordChangedComponent;
  let fixture: ComponentFixture<PasswordChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordChangedComponent ],
      imports: [ FormsModule,

        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
