import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilClientComponent} from './profil-client.component';
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";

describe('ProfilClientComponent', () => {
  let component: ProfilClientComponent;
  let fixture: ComponentFixture<ProfilClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilClientComponent],
      imports: [FormsModule,

        ReactiveFormsModule, RouterModule,
        RouterTestingModule,ToastrModule.forRoot(),
        HttpClientTestingModule, MatDialogModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
