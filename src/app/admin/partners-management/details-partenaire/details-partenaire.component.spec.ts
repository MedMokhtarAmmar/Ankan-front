import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPartenaireComponent } from './details-partenaire.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
describe('DetailsPartenaireComponent', () => {
  let component: DetailsPartenaireComponent;
  let fixture: ComponentFixture<DetailsPartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPartenaireComponent ],
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
    fixture = TestBed.createComponent(DetailsPartenaireComponent);
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
      partnerStatus:'NON_CONFIRME',
    };
    component.partenaire =partenaire ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('form invalid when empty', () => {
  //   expect(component.detailsForm.valid).toBeFalsy();
  // });
  // it('email field validity', () => {
  //
  //
  //   const ajoutForm = component.detailsForm;
  //   const partenaireNom = component.detailsForm.controls.partenaireNom;
  //   partenaireNom.setValue('partenaireNom');
  //   const partenairePrenom = component.detailsForm.controls.partenairePrenom;
  //   partenairePrenom.setValue('partenairePrenom');
  //   const partenaireAddress = component.detailsForm.controls.partenaireAddress;
  //   partenaireAddress.setValue('partenaireAddress');
  //   const ville = component.detailsForm.controls.ville;
  //   ville.setValue('ville');
  //   const partenairePhone = component.detailsForm.controls.partenairePhone;
  //   partenairePhone.setValue('12345698');
  //   const partenaireEmail = component.detailsForm.controls.partenaireEmail;
  //   partenaireEmail.setValue('partenaireEmail@test.com');
  //   const address2 = component.detailsForm.controls.address2;
  //   address2.setValue('address2');
  //   const address3 = component.detailsForm.controls.address3;
  //   address3.setValue('address3');
  //   const codePostal = component.detailsForm.controls.codePostal;
  //   codePostal.setValue('codePostal');
  //   const partenaireCivility = component.detailsForm.controls.partenaireCivility;
  //   partenaireCivility.setValue('partenaireCivility');
  //   const partenaireServiceName = component.detailsForm.controls.partenaireServiceName;
  //   partenaireServiceName.setValue('partenaireServiceName');
  //   const partenaireEstablishment = component.detailsForm.controls.partenaireEstablishment;
  //   partenaireEstablishment.setValue('partenaireEstablishment');
  //   const partenaireSiren = component.detailsForm.controls.partenaireSiren;
  //   partenaireSiren.setValue('partenaireSiren');
  //   const partnerStatus = component.ajoutForm.controls.partnerStatus;
  //   partnerStatus.setValue('NON_CONFIRME');
  //
  //
  //    fixture.nativeElement.querySelector('button[id="Submit"]').click();
  //
  //
  //   expect(ajoutForm.valid).toBeTruthy();
  //
  // });

});
