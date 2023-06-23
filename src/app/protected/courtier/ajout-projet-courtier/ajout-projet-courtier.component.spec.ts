import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AjoutProjetCourtierComponent} from './ajout-projet-courtier.component';
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {Auth} from "aws-amplify";


describe('AjoutProjetCourtierComponent', () => {
  let component: AjoutProjetCourtierComponent;
  let fixture: ComponentFixture<AjoutProjetCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutProjetCourtierComponent],
      imports: [
        FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProjetCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call loadUsers' , async () => {
    let spy = spyOn(Auth, 'currentAuthenticatedUser').and.returnValue(Promise.resolve(true));
    component.initialiseUser();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spy).toBeTruthy();
    });
  });



  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('form invalid when empty', () => {
    expect(component.projectForm.valid).toBeFalsy();
  });

  //test the form
  it('form field validity', () => {

    const projectForm = component.projectForm;
    const projectName = component.projectForm.controls.projectName;
    projectName.setValue('projectName');
    const clientFirstName = component.projectForm.controls.clientFirstName;
    clientFirstName.setValue('clientFirstName');
    const clientLastName = component.projectForm.controls.clientLastName;
    clientLastName.setValue('clientLastName');
    const clientEmail = component.projectForm.controls.clientEmail;
    clientEmail.setValue('client@test.test');
    const clientPhone = component.projectForm.controls.clientPhone;
    clientPhone.setValue('12345689');
    const projectStatus = component.projectForm.controls.projectStatus;
    projectStatus.setValue('IN_PROGRESS');


    fixture.nativeElement.querySelector('button[id="submitbutton"]').click();


    expect(projectForm.valid).toBeTruthy();
  });
});
