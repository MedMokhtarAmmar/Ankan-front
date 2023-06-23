import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerValidationModalComponent } from './confirmer-validation-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";

describe('ConfirmerValidationModalComponent', () => {
  let component: ConfirmerValidationModalComponent;
  let fixture: ComponentFixture<ConfirmerValidationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmerValidationModalComponent ],
      imports:[
        ToastrModule.forRoot(),
        MatDialogModule,
        HttpClientTestingModule],
      providers :[
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmerValidationModalComponent);
    component = fixture.componentInstance;
    let piece = {
      id:'',
      pieceName:'',
      projetID:'',
      categorieID:'',
      description:'',
      uploaderID:'',
      pieceStatus:'VERIFIED',
      modelPiece: '',
      createdAt:'',
      clientID:''
    };
    component.piece =piece;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //tester les bouttons
  it('should cancel', async(() => {

    spyOn(component, 'closeModal');
    let button = fixture.debugElement.nativeElement.querySelector('#cancel');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.closeModal).toHaveBeenCalled();
    })
  }));
  it('should confirm', async(() => {

    spyOn(component, 'ValiderPiece');
    let button = fixture.debugElement.nativeElement.querySelector('#confirm');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.ValiderPiece).toHaveBeenCalled();
    })
  }));
});
