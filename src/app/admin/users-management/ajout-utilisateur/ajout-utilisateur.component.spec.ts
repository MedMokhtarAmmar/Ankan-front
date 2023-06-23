import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AjoutUtilisateurComponent} from './ajout-utilisateur.component';
import {ConfirmationComponenetComponent} from "../confirmation-componenet/confirmation-componenet.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {User} from "../../../core/models/User";

describe('AjoutUtilisateurComponent', () => {
  let component: AjoutUtilisateurComponent;
  let fixture: ComponentFixture<AjoutUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutUtilisateurComponent],
      imports: [FormsModule,
        BrowserModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}]
    })
      .compileComponents();
    //create component and test fixture
    fixture = TestBed.createComponent(AjoutUtilisateurComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    let user = {
      id:'',
      firstName:'',
      lastName:'',
      username:'',
      email:'',
      userAddress:'',
      userPhone:'',
      status:''
    };
    component.user =user ;
    component.ngOnInit();
    fixture.detectChanges();
  }));

 // beforeEach(() => {

    // // create component and test fixture
    // fixture = TestBed.createComponent(AjoutUtilisateurComponent);
    // // get test component from the fixture
    // component = fixture.componentInstance;
    // component.ngOnInit();
  //});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.ajoutForm.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let email = component.ajoutForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let errors = {};
    let email = component.ajoutForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });


  it('email field validity', () => {


    const ajoutForm = component.ajoutForm;
    const firstName = component.ajoutForm.controls.firstName;
    firstName.setValue('usertest');
    const lastName = component.ajoutForm.controls.lastName;
    lastName.setValue('usertest');
    const username = component.ajoutForm.controls.username;
    username.setValue('usertest');
    const email = component.ajoutForm.controls.email;
    email.setValue('aaa@gm.tn');
    const userAddress = component.ajoutForm.controls.userAddress;
    userAddress.setValue('usertest');
    const userPhone = component.ajoutForm.controls.userPhone;
    userPhone.setValue('23568956');

    fixture.nativeElement.querySelector('button[id="Submit"]').click();


    expect(ajoutForm.valid).toBeTruthy();

  });



});
