import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplictionFunnel } from './application-funnel';

describe('ApplictionFunnel', () => {
  let component: ApplictionFunnel;
  let fixture: ComponentFixture<ApplictionFunnel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplictionFunnel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplictionFunnel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
