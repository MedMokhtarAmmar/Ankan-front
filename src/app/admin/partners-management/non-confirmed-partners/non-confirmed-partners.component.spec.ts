import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConfirmedPartnersComponent } from './non-confirmed-partners.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('NonConfirmedPartnersComponent', () => {
  let component: NonConfirmedPartnersComponent;
  let fixture: ComponentFixture<NonConfirmedPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonConfirmedPartnersComponent ],
      imports: [FormsModule,
        ToastrModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonConfirmedPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
