import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,

      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

