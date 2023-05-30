import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EspeciesService } from './especies.service';

describe('EspeciesService', () => {
  let service: EspeciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EspeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
