import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {DocumentInfoCourtierComponent} from "./document-info.component";

describe('DocumentInfoComponent', () => {
  let component: DocumentInfoCourtierComponent;
  let fixture: ComponentFixture<DocumentInfoCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentInfoCourtierComponent],
      imports: [MatDialogModule, RouterModule.forRoot([]), HttpClientTestingModule,ReactiveFormsModule],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentInfoCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
