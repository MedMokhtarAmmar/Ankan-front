import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDetailsProjetComponent } from './afficher-details-projet.component';
import {ProfilClientComponent} from "../profil-client/profil-client.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('AfficherDetailsProjetComponent', () => {
  let component: AfficherDetailsProjetComponent;
  let fixture: ComponentFixture<AfficherDetailsProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherDetailsProjetComponent ],
      imports: [FormsModule,

        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDetailsProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
