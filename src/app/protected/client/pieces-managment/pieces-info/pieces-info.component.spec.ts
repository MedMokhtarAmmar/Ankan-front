import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesInfoComponent } from './pieces-info.component';
import {RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {APP_BASE_HREF} from "@angular/common";

describe('PiecesInfoComponent', () => {
  let component: PiecesInfoComponent;
  let fixture: ComponentFixture<PiecesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecesInfoComponent ],
      imports:[RouterModule.forRoot([]),HttpClientTestingModule,MatDialogModule],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
