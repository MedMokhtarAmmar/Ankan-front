import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersManagementComponent } from './partners-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('PartnersManagementComponent', () => {
  let component: PartnersManagementComponent;
  let fixture: ComponentFixture<PartnersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersManagementComponent ],
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
    fixture = TestBed.createComponent(PartnersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //test des bouttons
  it('should add', async(() => {

    spyOn(component, 'openDialogAjoutUser');
    let button = fixture.debugElement.nativeElement.querySelector('#addpartner');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.openDialogAjoutUser).toHaveBeenCalled();
    })
  }));
});
