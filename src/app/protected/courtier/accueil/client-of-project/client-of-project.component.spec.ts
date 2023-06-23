import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOfProjectComponent } from './client-of-project.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ClientOfProjectComponent', () => {
  let component: ClientOfProjectComponent;
  let fixture: ComponentFixture<ClientOfProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ ClientOfProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOfProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
