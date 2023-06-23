import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsPieceCourtierComponent} from './details-piece-courtier.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DetailsPieceCourtierComponent', () => {
  let component: DetailsPieceCourtierComponent;
  let fixture: ComponentFixture<DetailsPieceCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPieceCourtierComponent],
      imports: [
        ToastrModule.forRoot(),
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPieceCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
