import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {Project} from "../models/Project";

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  let projects: Project[];
  let project : Project;
  //the mocker
  const projectExample = new Project();
  projectExample.id='123456';
  projectExample.status='IN_PROGRESS';
  projectExample.clientID=['123'];
  projectExample.courtierID='456';
  projectExample.projectName='project';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
