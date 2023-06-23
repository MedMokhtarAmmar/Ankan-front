import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCategorieComponent } from './modifier-categorie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ModifierCategorieComponent', () => {
  let component: ModifierCategorieComponent;
  let fixture: ComponentFixture<ModifierCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCategorieComponent ],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCategorieComponent);
    component = fixture.componentInstance;
    let categorie = {
      id:'',
      libelle:'',
      description:'',
      createdAt:'',
    };
    component.categorie =categorie ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //test the form
  it('form invalid when empty', () => {
    expect(component.editForm.valid).toBeFalsy();
  });
  // it('form field validity', () => {
  //
  //
  //   const editForm = component.editForm;
  //   const libelle = component.editForm.controls.libelle;
  //   libelle.setValue('libelle');
  //   const description = component.editForm.controls.description;
  //   description.setValue('description');
  //
  //   fixture.nativeElement.querySelector('button[id="onSubmit"]').click();
  //
  //
  //   expect(editForm.valid).toBeTruthy();
  //
  // });
});
