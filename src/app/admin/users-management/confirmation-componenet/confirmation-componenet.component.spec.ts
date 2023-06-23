import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationComponenetComponent} from './confirmation-componenet.component';
import {ModifierUtilisateurComponent} from "../modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserModule} from "@angular/platform-browser";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {User} from "../../../core/models/User";

describe('ConfirmationComponenetComponent', () => {
  let component: ConfirmationComponenetComponent;
  let fixture: ComponentFixture<ConfirmationComponenetComponent>;
  let user ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationComponenetComponent],
      imports: [FormsModule,
        ToastrModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponenetComponent);
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
    component.user =user;
    fixture.detectChanges();
  });
  it('should confirm', async(() => {

    spyOn(component, 'deleteUser');
    let button = fixture.debugElement.nativeElement.querySelector('#confirmer');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.deleteUser).toHaveBeenCalled();
    })
  }));

  it('should cancel', async(() => {

    spyOn(component, 'closeModal');
    let button = fixture.debugElement.nativeElement.querySelector('#annuler');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.closeModal).toHaveBeenCalled();
    })
  }));

});
