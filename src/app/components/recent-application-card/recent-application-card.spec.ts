import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentApplicationCard } from './recent-application-card';

describe('RecentApplicationCard', () => {
  let component: RecentApplicationCard;
  let fixture: ComponentFixture<RecentApplicationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentApplicationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentApplicationCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
