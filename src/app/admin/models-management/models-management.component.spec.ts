import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsManagementComponent } from './models-management.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

describe('ModelsManagementComponent', () => {
  let component: ModelsManagementComponent;
  let fixture: ComponentFixture<ModelsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsManagementComponent ],
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
    fixture = TestBed.createComponent(ModelsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
