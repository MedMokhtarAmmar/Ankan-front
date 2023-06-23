import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierListPieceComponent } from './modifier-list-piece.component';
import {RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('ModifierListPieceComponent', () => {
  let component: ModifierListPieceComponent;
  let fixture: ComponentFixture<ModifierListPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierListPieceComponent ],
      imports:[RouterModule.forRoot([]),HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterModule,
        RouterTestingModule,
        HttpClientTestingModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierListPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
