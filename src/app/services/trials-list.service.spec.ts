import { TestBed } from '@angular/core/testing';

import { TrialsListService } from './trials-list.service';

describe('TrialsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrialsListService = TestBed.get(TrialsListService);
    expect(service).toBeTruthy();
  });
});
