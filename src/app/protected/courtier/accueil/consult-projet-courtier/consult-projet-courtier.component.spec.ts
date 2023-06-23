import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConsultProjetCourtierComponent} from './consult-projet-courtier.component';
import {ModifierUtilisateurComponent} from "../../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";

describe('ConsultProjetCourtierComponent', () => {
  let component: ConsultProjetCourtierComponent;
  let fixture: ComponentFixture<ConsultProjetCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultProjetCourtierComponent],
      imports: [

        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultProjetCourtierComponent);
     component = fixture.componentInstance;
    // let project = {
    //   projectName:'',
    //   email:'',
    //   firstName:'',
    //   lastName:'',
    //   userPhone:'',
    //   status:'',
    // };
    // component.project =project ;
    fixture.detectChanges();
  });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  //test the form
  // it('form invalid when empty', () => {
  //   expect(component.projectForm.valid).toBeFalsy();
  // });
  // it('form field validity', () => {
  //
  //
  //   const editForm = component.projectForm;
  //   const projectName = component.projectForm.controls.projectName;
  //   projectName.setValue('projectName');
  //   const email = component.projectForm.controls.email;
  //   email.setValue('test@test.com');
  //   const firstName = component.projectForm.controls.firstName;
  //   firstName.setValue('firstName');
  //   const lastName = component.projectForm.controls.lastName;
  //   lastName.setValue('lastName');
  //   const userPhone = component.projectForm.controls.userPhone;
  //   userPhone.setValue('1234568');
  //   const status = component.projectForm.controls.status;
  //   status.setValue('NEW');
  //
  //
  //
  //   fixture.nativeElement.querySelector('button[id="editproject"]').click();
  //
  //
  //   expect(editForm.valid).toBeTruthy();
  //
  // });


});
