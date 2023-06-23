import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultProjetClientComponent } from './consult-projet-client.component';
import {ModifierUtilisateurComponent} from "../../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('ConsultProjetClientComponent', () => {
  let component: ConsultProjetClientComponent;
  let fixture: ComponentFixture<ConsultProjetClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultProjetClientComponent ],
      imports: [ FormsModule,

        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultProjetClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
