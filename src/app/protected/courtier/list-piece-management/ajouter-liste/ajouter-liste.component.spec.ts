import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterListeComponent } from './ajouter-liste.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

describe('AjouterListeComponent', () => {
  let component: AjouterListeComponent;
  let fixture: ComponentFixture<AjouterListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterListeComponent ],
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
    fixture = TestBed.createComponent(AjouterListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
