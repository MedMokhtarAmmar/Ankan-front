import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePieceComponent } from './update-piece.component';

describe('UpdatePieceComponent', () => {
  let component: UpdatePieceComponent;
  let fixture: ComponentFixture<UpdatePieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
