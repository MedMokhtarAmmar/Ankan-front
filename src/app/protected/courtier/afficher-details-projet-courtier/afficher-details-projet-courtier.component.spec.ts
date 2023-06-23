import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {AfficherDetailsProjetCourtierComponent} from './afficher-details-projet-courtier.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {APP_BASE_HREF} from "@angular/common";
import {of} from "rxjs";
import Auth from "@aws-amplify/auth";
import {UserService} from "../../../core/services/user.service";


describe('AfficherDetailsProjetCourtierComponent', () => {
  let component: AfficherDetailsProjetCourtierComponent;
  let fixture: ComponentFixture<AfficherDetailsProjetCourtierComponent>;
  let userService: UserService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AfficherDetailsProjetCourtierComponent],
      imports: [MatDialogModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot([]),
        BrowserModule,
        FormsModule, ReactiveFormsModule
      ],
      providers: [
        {provide: ToastrService, useClass: ToastrService},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}, {provide: APP_BASE_HREF, useValue: '/'},
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDetailsProjetCourtierComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    spyOn(Auth, 'currentUserInfo').and.returnValue(Promise.resolve(true));
    expect(component).toBeTruthy();

  });

  //
  // it('should call getCurrentUser and getUserByEmail in getUser ', async () => {
  //   let spy = spyOn(Auth, 'currentUserInfo').and.returnValue(Promise.resolve(true));
  //   spyOn(userService, 'loadUserByEmail').and.callThrough();
  //   await component.initialiseUser();
  //   fixture.whenStable().then(() => {
  //     expect(spy).toHaveBeenCalled();
  //     expect(userService.loadUserByEmail).toHaveBeenCalled();
  //   });
  // });


});
