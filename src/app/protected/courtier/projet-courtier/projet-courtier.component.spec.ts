import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetCourtierComponent } from './projet-courtier.component';
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('ProjetCourtierComponent', () => {
  let component: ProjetCourtierComponent;
  let fixture: ComponentFixture<ProjetCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetCourtierComponent ],
      imports: [ FormsModule,

        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
