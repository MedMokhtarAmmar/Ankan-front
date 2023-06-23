import {Component, Input, OnInit} from '@angular/core';
import {ProjectService} from "../../../../../core/services/project.service";
import {Project} from "../../../../../core/models/Project";


@Component({
  selector: 'app-projet-tableau',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {

  @Input() projectID: any;
  public project: Project;

  constructor(private projectService: ProjectService) {
    this.project = new Project();
  }

  ngOnInit(): void {

    if (this.projectID !== undefined ) {
      this.getProjectById();
    }

  }

  getProjectById() {
    this.projectService.getProjectsbyID(this.projectID).subscribe((res: any) => {
      this.project = res.result;
    })
  }
}
