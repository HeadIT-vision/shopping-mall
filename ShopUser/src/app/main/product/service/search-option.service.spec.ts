import { TestBed } from '@angular/core/testing';
import { SearchOptionService } from './search-option.service';


describe('SearchOptionServiceService', () => {
  let service: SearchOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
