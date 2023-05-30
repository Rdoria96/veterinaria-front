import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropietarioComponent } from './propietario.component';

describe('PropietarioComponent', () => {
  let component: PropietarioComponent;
  let fixture: ComponentFixture<PropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PropietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
