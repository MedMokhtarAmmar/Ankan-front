import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPieceModalComponent } from './ajout-piece-modal.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";

describe('AjoutPieceModalComponent', () => {
  let component: AjoutPieceModalComponent;
  let fixture: ComponentFixture<AjoutPieceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPieceModalComponent ],
      imports: [
        ToastrModule.forRoot(),
        MatDialogModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
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
    fixture = TestBed.createComponent(AjoutPieceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
