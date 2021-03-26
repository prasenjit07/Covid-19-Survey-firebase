import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeThreatComponent } from './home-threat.component';

describe('HomeThreatComponent', () => {
  let component: HomeThreatComponent;
  let fixture: ComponentFixture<HomeThreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeThreatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeThreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
