import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationComponentComponent } from './confirmation-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('ConfirmationComponentComponent', () => {
  let component: ConfirmationComponentComponent;
  let fixture: ComponentFixture<ConfirmationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationComponentComponent ],
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
    fixture = TestBed.createComponent(ConfirmationComponentComponent);
    component = fixture.componentInstance;
    let partenaire = {
      id:'',
      partenaireNom:'',
      partenairePrenom:'',
      partenaireAddress:'',
      ville:'',
      partenairePhone:'',
      partenaireEmail:'',
      address2:'',
      address3:'',
      codePostal:'',
      partenaireCivility:'',
      partenaireServiceName:'',
      partenaireEstablishment:'',
      partenaireSiren:'',
      Iduser:'',
      partnerStatus:'NON_CONFIRME'
    };
    component.partenaire =partenaire ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should cancel', async(() => {

    spyOn(component, 'closeModal');
    let button = fixture.debugElement.nativeElement.querySelector('#annuler');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.closeModal).toHaveBeenCalled();
    })
  }));
  it('should cancel', async(() => {

    spyOn(component, 'confirmPartner');
    let button = fixture.debugElement.nativeElement.querySelector('#confirmer');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.confirmPartner).toHaveBeenCalled();
    })
  }));
});
