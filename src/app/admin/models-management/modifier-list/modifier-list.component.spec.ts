import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierListComponent } from './modifier-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ModifierListComponent', () => {
  let component: ModifierListComponent;
  let fixture: ComponentFixture<ModifierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierListComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
