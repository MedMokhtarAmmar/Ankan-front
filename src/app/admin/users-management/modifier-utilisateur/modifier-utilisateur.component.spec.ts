import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ModifierUtilisateurComponent} from './modifier-utilisateur.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {User} from "../../../core/models/User";
import {FormComponent} from "aws-amplify-angular/dist/src/components/common/form.component";
import {AjoutUtilisateurComponent} from "../ajout-utilisateur/ajout-utilisateur.component";


describe('ModifierUtilisateurComponent', () => {
  let component: ModifierUtilisateurComponent;
  let fixture: ComponentFixture<ModifierUtilisateurComponent>;
  //let comp:    FormComponent;
  // let location: Location;
  // let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierUtilisateurComponent],
      imports: [FormsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierUtilisateurComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    let user = {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      userAddress: '',
      userPhone: '',
      status:''
    };

    component.user = user;
    component.ngOnInit();
    fixture.detectChanges();
  }));


  it('email field validity', () => {


    const editForm = component.editForm;
    const firstName = component.editForm.controls.firstName;
    firstName.setValue('usertest');
    const lastName = component.editForm.controls.lastName;
    lastName.setValue('usertest');
    const username = component.editForm.controls.username;
    username.setValue('usertest');
    const email = component.editForm.controls.email;
    email.setValue('aaa@gm.tn');
    const userAddress = component.editForm.controls.userAddress;
    userAddress.setValue('usertest');
    const userPhone = component.editForm.controls.userPhone;
    userPhone.setValue('23568956');

    fixture.nativeElement.querySelector('button[id="Submit"]').click();


    expect(editForm.valid).toBeTruthy();

  });


});
