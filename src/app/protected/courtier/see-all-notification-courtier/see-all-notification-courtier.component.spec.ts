import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllNotificationCourtierComponent } from './see-all-notification-courtier.component';

describe('SeeAllNotificationCourtierComponent', () => {
  let component: SeeAllNotificationCourtierComponent;
  let fixture: ComponentFixture<SeeAllNotificationCourtierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeAllNotificationCourtierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllNotificationCourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
