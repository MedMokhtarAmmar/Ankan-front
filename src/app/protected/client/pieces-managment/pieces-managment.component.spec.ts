import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesManagmentComponent } from './pieces-managment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('PiecesManagmentComponent', () => {
  let component: PiecesManagmentComponent;
  let fixture: ComponentFixture<PiecesManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecesManagmentComponent ],
      imports: [ FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
