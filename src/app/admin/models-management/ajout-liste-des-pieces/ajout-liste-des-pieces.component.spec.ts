import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AjoutListeDesPiecesComponent} from './ajout-liste-des-pieces.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('AjoutListeDesPiecesComponent', () => {
  let component: AjoutListeDesPiecesComponent;
  let fixture: ComponentFixture<AjoutListeDesPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutListeDesPiecesComponent],
      imports: [
        RouterTestingModule,
        RouterModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule, FormsModule,
        ReactiveFormsModule,
        MatDialogModule],
      providers: [{provide: ToastrService, useClass: ToastrService}, {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutListeDesPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
