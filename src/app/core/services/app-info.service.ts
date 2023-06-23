import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  constructor(private http: HttpClient) { }
  public getCurrentVersion() {
    return this.http.get('app-info/version').toPromise();
  }
}
