import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProjetClientComponent } from './ajout-projet-client.component';
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule, ToastrService} from "ngx-toastr";

describe('AjoutProjetClientComponent', () => {
  let component: AjoutProjetClientComponent;
  let fixture: ComponentFixture<AjoutProjetClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutProjetClientComponent ],
      imports: [ FormsModule,
ToastrModule.forRoot(),
        ReactiveFormsModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,MatDialogModule],
      providers:[]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutProjetClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //tester le boutton create the project
  it('should create the project', async(() => {

    spyOn(component, 'onSubmit');
    let button = fixture.debugElement.nativeElement.querySelector('#create');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    })
  }));
  //tester le formulaire
  it('form invalid when empty', () => {
    expect(component.projectForm.valid).toBeFalsy();
  });

  it('form field validity', () => {


    const projectForm = component.projectForm;
    const projectName = component.projectForm.controls.projectName;
    projectName.setValue('projecttest');
    const courtierFirstName = component.projectForm.controls.courtierFirstName;
    courtierFirstName.setValue('courtiertest');
    const courtierEmail = component.projectForm.controls.courtierEmail;
    courtierEmail.setValue('courtiertest@test.com');
    const courtierPhone = component.projectForm.controls.courtierPhone;
    courtierPhone.setValue('58721639');
    const projectStatus = component.projectForm.controls.projectStatus;
    projectStatus.setValue('NEW');

    fixture.nativeElement.querySelector('button[id="create"]').click();


    expect(projectForm.valid).toBeTruthy();
  });



});
