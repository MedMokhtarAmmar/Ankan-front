import {getTestBed, TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../models/User";
import {HttpBackend, HttpClientModule} from "@angular/common/http";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let users: User[] = [];
  let users1: User[] = [];
  const exampleUser = new User();
  exampleUser.firstName = 'aaaaaa';
  exampleUser.lastName = 'aaaaaa';
  exampleUser.id = '1213456';
  exampleUser.email = 'test@test.test';
  exampleUser.userAddress = 'aaaaaa';
  exampleUser.userPhone = 'aaaaaa';


  let page: number = 1;
  let perPage: number = 1;
  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientModule,
          HttpClientTestingModule],
        providers: [UserService]


      });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>',
      () => {

        const exampleUsers = new User();
        exampleUsers.firstName = 'aaaaaa';
        exampleUsers.lastName = 'aaaaaa';
        exampleUsers.email = 'test@test.test';
        exampleUsers.userAddress = 'aaaaaa';
        exampleUsers.userPhone = 'aaaaaa';
        const list: User[] = [];
        list.push(exampleUsers);
        service.getUsers(page, perPage).subscribe((data: any) => {
          users.push(data);
          //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa' + data);
          //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa' + users);
          expect(users.length).toBe(1);
          expect(users).toEqual(list);
        });

        const req = httpMock.expectOne(`${service.USERS_URL}` + '?page=' + page + '&perpage=' + perPage);
        expect(req.request.method).toBe('GET');
        req.flush(exampleUsers);
      }
    );
  });
  it('update user ', () => {
    const id = "123";

    service.modifierUser(id, exampleUser).then((data: any) => {
      expect(data.firstName).toBe('aaaaaa');

    }).catch((err) => {
      console.log(err);
      //console.log("errrr");});
      const req = httpMock.expectOne(`${service.USERS_URL+id }`);
      expect(req.request.method).toBe('PATCH');
      req.flush(exampleUser);
    });


  });

  it('should add user ', () => {

    service.ajoutUser(exampleUser).then((data: any) => {

      expect(data.id).toBe('1213456');

    });
    const req = httpMock.expectOne(`${service.USERS_URL}`);
    expect(req.request.method).toBe('POST');
    req.flush(exampleUser);
  });

  it('should delete user ', () => {

    const list: User[] = [];
    list.push(exampleUser);
    service.deleteUser(exampleUser).subscribe();
    const req = httpMock.expectOne(`${service.USERS_URL+'1213456'}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(list);
  });

  it('should get user by id ', () => {
    service.getUser('1213456').then((data: any) => {
      expect(data.id).toBe('1213456');
    });
    const req = httpMock.expectOne(`${service.USERS_URL+'1213456'}`);
    expect(req.request.method).toBe('GET');
    req.flush(exampleUser);
  });



});
