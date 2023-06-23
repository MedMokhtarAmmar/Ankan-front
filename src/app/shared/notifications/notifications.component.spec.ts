import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {APP_BASE_HREF} from "@angular/common";

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsComponent ],
      imports: [MatDialogModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        BrowserModule,
        FormsModule, ReactiveFormsModule
      ],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},{provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
