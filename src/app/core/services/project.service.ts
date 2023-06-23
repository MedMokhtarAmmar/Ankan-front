import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/User';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
public PROJECT_URL= 'project/';

  constructor(private http: HttpClient) { }

  getProjectsbyID(projectId: string) {
    return this.http.get(this.PROJECT_URL + projectId );
  }


  getProjectsbyCourtierID(courtierID : string){
    let params = new HttpParams();
    params = params.append('courtierID' , courtierID);
    return this.http.get(this.PROJECT_URL ,{params:params}).toPromise();
  }

  getProjectById(id: string){
    return this.http.get(this.PROJECT_URL+id).toPromise()
}



  getProjectsbyClientID(clientID : string){
    let params = new HttpParams();
    params = params.append('clientID' , clientID);
    return this.http.get(this.PROJECT_URL ,{params:params}).toPromise();
  }
  creerProjet(project : Project){
  return this.http.post(this.PROJECT_URL ,project).toPromise();
  }

  modifierProject(id: string, project: Project) {
    return this.http.put(this.PROJECT_URL + id, project).toPromise()
  }
  getProject(page: number, perPage: number) {
    return this.http.get<Project[]>(this.PROJECT_URL + '?page=' + page + '&perpage=' + perPage);
  }


  getProjectsbyClientEmail(clientEmail : string){
    let params = new HttpParams();
    params = params.append('clientEmail' , clientEmail);
    return this.http.get(this.PROJECT_URL ,{params:params}).toPromise();
  }

}
