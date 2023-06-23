import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDocumentComponent } from './ajout-document.component';
import {ProfilClientComponent} from "../../profil-client/profil-client.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {SharedModule} from "../../../../shared/shared.module";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {By} from "protractor";

describe('AjoutDocumentComponent', () => {
  let component: AjoutDocumentComponent;
  let fixture: ComponentFixture<AjoutDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDocumentComponent ],
      imports: [FormsModule,
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        SharedModule,
        PdfViewerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        HttpClientTestingModule, MatDialogModule,],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {}  }
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });



});
