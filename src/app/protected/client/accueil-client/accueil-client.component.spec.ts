import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccueilClientComponent} from './accueil-client.component';
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {ProjectService} from "../../../core/services/project.service";
import {of} from "rxjs";

describe('AccueilClientComponent', () => {
  let component: AccueilClientComponent;
  let fixture: ComponentFixture<AccueilClientComponent>;
  let projectService: ProjectService;
  const projectServiceStub: jasmine.SpyObj<ProjectService> = jasmine.createSpyObj(
    'projectService',
    ['getProjectsbyClientID']
  );


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilClientComponent],
      imports: [FormsModule,

        ReactiveFormsModule, RouterModule,
        RouterTestingModule,
        HttpClientTestingModule, MatDialogModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilClientComponent);
    component = fixture.componentInstance;
    let user = {
      id: '1',
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      email: 'test@test.com',
      userAddress: 'test',
      userPhone: '1234568',
      status: 'new'

    };

    let project  = {
      id: '2',
      projectName: 'test',
      status: 'NEW',
      clientID: ['1'],
      courtierID: '3',
      lastConsultationDay: '',
      clientEmail:['aaa@aaa.com'],


    };
    component.user = user;
    component.project = project;
    console.log(component.project);
    component.ngOnInit();

    fixture.detectChanges();
  });




});
