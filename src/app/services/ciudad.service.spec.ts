import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CiudadService } from './ciudad.service';

describe('CiudadService', () => {
  let service: CiudadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CiudadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
