import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceInfoCourtierComponent } from './piece-info-courtier.component';
import {RouterModule} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {APP_BASE_HREF} from "@angular/common";

describe('PieceInfoCourtierComponent', () => {
  let component: PieceInfoCourtierComponent;
  let fixture: ComponentFixture<PieceInfoCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ PieceInfoCourtierComponent ],
      imports:[RouterModule.forRoot([]),HttpClientTestingModule,MatDialogModule],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceInfoCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
