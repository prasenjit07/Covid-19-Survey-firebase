import { TestBed } from '@angular/core/testing';

import { HomeAddGuard } from './home-add.guard';

describe('HomeAddGuard', () => {
  let guard: HomeAddGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeAddGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
