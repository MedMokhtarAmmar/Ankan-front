import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJwtComponent } from './modal-jwt.component';
import {ModifierUtilisateurComponent} from "../../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";


  describe('ModalJwtComponent', () => {
    let component: ModalJwtComponent;
    let fixture: ComponentFixture<ModalJwtComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ModalJwtComponent],
        imports: [FormsModule, MatDialogModule,

          ReactiveFormsModule, RouterModule,
          RouterTestingModule,
          HttpClientTestingModule, MatDialogModule],
        providers: [{provide: MAT_DIALOG_DATA, useValue: {}},
          {provide: MatDialogRef, useValue: {}}]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ModalJwtComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
;
