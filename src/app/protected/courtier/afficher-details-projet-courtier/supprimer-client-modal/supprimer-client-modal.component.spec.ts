import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SupprimerClientModalComponent} from './supprimer-client-modal.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";

describe('SupprimerClientModalComponent', () => {
  let component: SupprimerClientModalComponent;
  let fixture: ComponentFixture<SupprimerClientModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupprimerClientModalComponent],
      imports: [
        ToastrModule.forRoot(),
        MatDialogModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
