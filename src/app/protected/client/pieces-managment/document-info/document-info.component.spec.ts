import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentInfoComponent} from './document-info.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('DocumentInfoComponent', () => {
  let component: DocumentInfoComponent;
  let fixture: ComponentFixture<DocumentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentInfoComponent],
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
    fixture = TestBed.createComponent(DocumentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
