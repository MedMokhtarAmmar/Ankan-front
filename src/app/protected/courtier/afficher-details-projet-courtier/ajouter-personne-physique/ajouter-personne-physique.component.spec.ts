import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPersonnePhysiqueComponent } from './ajouter-personne-physique.component';
import {AjoutPieceModalComponent} from "../ajout-piece-modal/ajout-piece-modal.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('AjouterPersonnePhysiqueComponent', () => {
  let component: AjouterPersonnePhysiqueComponent;
  let fixture: ComponentFixture<AjouterPersonnePhysiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterPersonnePhysiqueComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPersonnePhysiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
