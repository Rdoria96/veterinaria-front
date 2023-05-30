import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PacienteComponent } from './paciente.component';
import { FormBuilder } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { PropietarioService } from 'src/app/services/propietario.service';
import { EspeciesService } from 'src/app/services/especies.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Paciente } from 'src/app/interfaces/paciente';
describe('PacienteComponent', () => {
  let component: PacienteComponent;
  let fixture: ComponentFixture<PacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PacienteComponent ],
      providers: [
        FormBuilder,
        DatePipe,
        PacienteService,
        PropietarioService,
        EspeciesService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Inicialización del formulario con valores predeterminados
  it('should initialize myForm with default values', () => {
    expect(component.myForm.get('nmid')?.value).toBeNull();
    expect(component.myForm.get('nombre_paciente')?.value).toEqual('');
    expect(component.myForm.get('f_nacimiento')?.value).toEqual('');
    expect(component.myForm.get('especie')?.value).toBeNull();
    expect(component.myForm.get('raza')?.value).toEqual('');
    expect(component.myForm.get('f_registro')?.value).toEqual('');
    expect(component.myForm.get('propietario')?.value).toBeNull();
  });


  //Verificamos que se llame a servicepaciente.getpaciente en el metodo refresh
  it('should call servicepaciente.getpaciente on refresh', () => {
    const pacienteService = TestBed.inject(PacienteService);
    spyOn(pacienteService, 'getpaciente').and.returnValue(of({ dato: [] }));
    component.refresh();
    expect(pacienteService.getpaciente).toHaveBeenCalled();

  });




  it('should call servicepaciente.guardar with the form values if it is valid', () => {
    const pacienteService = TestBed.inject(PacienteService);
    spyOn(pacienteService, 'guardar').and.returnValue(of({} as Paciente));
    spyOn(Swal, 'fire');
    const f_nacimiento = new Date('2022-01-01');
    const f_registro = new Date('2022-01-01');
    component.myForm.setValue({
      nmid: 1,
      nombre_paciente: 'Test Patient',
      f_nacimiento: f_nacimiento,
      especie: 2,
      raza: 'Test Raza',
      f_registro: f_registro,
      propietario: 3
    });
    component.guardar(component.myForm);
    expect(pacienteService.guardar).toHaveBeenCalledWith({
      nmid: 1,
      nombre_paciente: 'Test Patient',
      f_nacimiento: f_nacimiento,
      especie: { nmid: 2, nombre_especie: '' },
      raza: 'Test Raza',
      f_registro: f_registro,
      propietario: {
        nmid: 3,
        tipo_documento: '',
        ident_p: '',
        nombre_p: '',
        apellido_p: '',
        ciudad: { nmid: 0, nombre_ciudad: '' },
        telefono_p: ''
      }
    });
    expect(Swal.fire).toHaveBeenCalledWith('Exito', 'Registro exitoso', 'success');
  });

  //Verificar que el metodo mostrar funcione correctamente
  it('should update myForm values when mostrar method is called', () => {
    const f_nacimiento = new Date();
    const f_registro = new Date();

    const datos = {
      nmid: 1,
      nombre_paciente: 'Test Patient',
      f_nacimiento: f_nacimiento,
      nmid_especie: 2,
      raza: 'Test Raza',
      f_registro: f_registro,
      nmid_propietario: 3
    };


    component.mostrar(datos);

    expect(component.myForm.get('nmid')?.value).toEqual(1);
    expect(component.myForm.get('nombre_paciente')?.value).toEqual('Test Patient');
    expect(component.myForm.get('f_nacimiento')?.value).toEqual(f_nacimiento);
    expect(component.myForm.get('especie')?.value).toEqual(2);
    expect(component.myForm.get('raza')?.value).toEqual('Test Raza');
    expect(component.myForm.get('f_registro')?.value).toEqual(f_registro);
    expect(component.myForm.get('propietario')?.value).toEqual(3);
  });



});
