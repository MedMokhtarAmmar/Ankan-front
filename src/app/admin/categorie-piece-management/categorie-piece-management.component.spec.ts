import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriePieceManagementComponent } from './categorie-piece-management.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('CategoriePieceManagementComponent', () => {
  let component: CategoriePieceManagementComponent;
  let fixture: ComponentFixture<CategoriePieceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriePieceManagementComponent ],
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
    fixture = TestBed.createComponent(CategoriePieceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add partner ', async(() => {

    spyOn(component, 'openDialogAjoutCategorie');
    let button = fixture.debugElement.nativeElement.querySelector('#ajouter');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.openDialogAjoutCategorie).toHaveBeenCalled();
    })
  }));
});
