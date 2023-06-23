import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutNomCourtierComponent } from './ajout-nom-courtier.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('AjoutNomCourtierComponent', () => {
  let component: AjoutNomCourtierComponent;
  let fixture: ComponentFixture<AjoutNomCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutNomCourtierComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutNomCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
