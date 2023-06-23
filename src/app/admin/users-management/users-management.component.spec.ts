import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementComponent } from './users-management.component';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ProjectService} from "../../core/services/project.service";
import {UserService} from "../../core/services/user.service";
import {Observable, of} from "rxjs";
import {User} from "../../core/models/User";

describe('UsersManagementComponent', () => {
  let component: UsersManagementComponent;
  let fixture: ComponentFixture<UsersManagementComponent>;
  const userServiceStub: jasmine.SpyObj<UserService> = jasmine.createSpyObj(
    'userService',
    ['getProjectsbyClientID']
  );


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersManagementComponent ],
      imports:[MatDialogModule,HttpClientTestingModule,ToastrModule.forRoot()],
      providers:[{provide: ToastrService, useClass: ToastrService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //test sur le bouton ajouter utilisateur
  it('should add', async(() => {

    spyOn(component, 'openDialogAjoutUser');
    let button = fixture.debugElement.nativeElement.querySelector('#add');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.openDialogAjoutUser).toHaveBeenCalled();
    })
  }));
  //test sur le bouton supprimer
  // it('should delete', async(() => {
  //
  //   spyOn(component, 'OpenDialogConfirmation');
  //   let button = fixture.debugElement.nativeElement.querySelector('#Supprimer');
  //   button.click();
  //
  //   fixture.whenStable().then(() => {
  //     expect(component.OpenDialogConfirmation).toHaveBeenCalled();
  //   })
  //}));
 // test sur le bouton ajouter modifier
 //  it('should modify', async(() => {
 //
 //    spyOn(component, 'openDialogModifierUser');
 //    let button = fixture.debugElement.nativeElement.querySelector('#modify');
 //    button.click();
 //
 //    fixture.whenStable().then(() => {
 //      expect(component.openDialogModifierUser).toHaveBeenCalled();
 //    })
 //  }));
});
