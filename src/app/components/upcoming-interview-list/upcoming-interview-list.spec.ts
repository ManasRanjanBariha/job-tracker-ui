import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingInterviewList } from './upcoming-interview-list';

describe('UpcomingInterviewList', () => {
  let component: UpcomingInterviewList;
  let fixture: ComponentFixture<UpcomingInterviewList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingInterviewList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingInterviewList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
