import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCourtierComponent } from './sidebar-courtier.component';
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('SidebarCourtierComponent', () => {
  let component: SidebarCourtierComponent;
  let fixture: ComponentFixture<SidebarCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCourtierComponent ],
      imports: [ FormsModule,

        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
