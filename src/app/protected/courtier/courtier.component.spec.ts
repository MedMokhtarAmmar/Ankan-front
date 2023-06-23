import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtierComponent } from './courtier.component';
import {ModifierUtilisateurComponent} from "../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('CourtierComponent', () => {
  let component: CourtierComponent;
  let fixture: ComponentFixture<CourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtierComponent ],
      imports: [ FormsModule,

        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
