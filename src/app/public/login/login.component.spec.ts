import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {ModifierUtilisateurComponent} from "../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {AmplifyService} from "aws-amplify-angular";
import {AuthService} from "../../core/services/authentification/auth.service";
import {of} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['signIn']
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ToastrModule.forRoot(),
        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: [{provide: ToastrService, useClass: ToastrService},AmplifyService,{provide: AuthService,
        useValue: authServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });





});
