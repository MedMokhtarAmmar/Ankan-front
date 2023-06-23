import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPartenaireComponent } from './ajout-partenaire.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('AjoutPartenaireComponent', () => {
  let component: AjoutPartenaireComponent;
  let fixture: ComponentFixture<AjoutPartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPartenaireComponent ],
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
    fixture = TestBed.createComponent(AjoutPartenaireComponent);
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
  it('form invalid when empty', () => {
    expect(component.addForm.valid).toBeFalsy();
  });
  it('form field validity', () => {


    const addForm = component.addForm;
    const partenaireNom = component.addForm.controls.partenaireNom;
    partenaireNom.setValue('partenaireNom');
    const partenairePrenom = component.addForm.controls.partenairePrenom;
    partenairePrenom.setValue('partenairePrenom');
    const partenaireAddress = component.addForm.controls.partenaireAddress;
    partenaireAddress.setValue('partenaireAddress');
    const ville = component.addForm.controls.ville;
    ville.setValue('ville');
    const partenairePhone = component.addForm.controls.partenairePhone;
    partenairePhone.setValue('12345698');
    const partenaireEmail = component.addForm.controls.partenaireEmail;
    partenaireEmail.setValue('partenaireEmail@test.com');
    const address2 = component.addForm.controls.address2;
    address2.setValue('address2');
    const address3 = component.addForm.controls.address3;
    address3.setValue('address3');
    const codePostal = component.addForm.controls.codePostal;
    codePostal.setValue('codePostal');
    const partenaireCivility = component.addForm.controls.partenaireCivility;
    partenaireCivility.setValue('partenaireCivility');
    const partenaireServiceName = component.addForm.controls.partenaireServiceName;
    partenaireServiceName.setValue('partenaireServiceName');
    const partenaireEstablishment = component.addForm.controls.partenaireEstablishment;
    partenaireEstablishment.setValue('partenaireEstablishment');
    const partenaireSiren = component.addForm.controls.partenaireSiren;
    partenaireSiren.setValue('partenaireSiren');




     fixture.nativeElement.querySelector('button[id="on_submit"]').click();


    expect(addForm.valid).toBeTruthy();

  });
});
