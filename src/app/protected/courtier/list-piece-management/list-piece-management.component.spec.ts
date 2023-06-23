import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPieceManagementComponent } from './list-piece-management.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

describe('ListPieceManagementComponent', () => {
  let component: ListPieceManagementComponent;
  let fixture: ComponentFixture<ListPieceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPieceManagementComponent ],
      imports:[
        RouterTestingModule,
        RouterModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,FormsModule,
        ReactiveFormsModule,
        MatDialogModule],
      providers:[{provide: ToastrService, useClass: ToastrService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPieceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
