import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AjoutModeleComponent} from './ajout-modele.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('AjoutModeleComponent', () => {
  let component: AjoutModeleComponent;
  let fixture: ComponentFixture<AjoutModeleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutModeleComponent],
      imports: [
        RouterTestingModule,
        RouterModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule, FormsModule,
        ReactiveFormsModule,
        MatDialogModule],
      providers: [{provide: ToastrService, useClass: ToastrService}, {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
