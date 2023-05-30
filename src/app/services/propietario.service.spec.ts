import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropietarioService } from './propietario.service';

describe('PropietarioService', () => {
  let service: PropietarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PropietarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
