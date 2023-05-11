import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Especies } from 'src/app/interfaces/especies';
import { Paciente } from 'src/app/interfaces/paciente';
import { Propietario } from 'src/app/interfaces/propietario';
import { EspeciesService } from 'src/app/services/especies.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { PropietarioService } from 'src/app/services/propietario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {
  displayedColumns: string[] = ['nmid', 'nombre_paciente', 'f_nacimiento', 'especie', 'raza', 'f_registro', 'propietario', 'accion'];
  myForm!: FormGroup;
  datosPaciente: any;
  datosEspecie: any;
  datosPropietario: any;

  constructor(private fb: FormBuilder, private servicepaciente: PacienteService, private servicepropietario: PropietarioService, private servicespecies: EspeciesService) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [],
      nombre_paciente: [''],
      f_nacimiento: [''],
      especie: [],
      raza: [''],
      f_registro: [''],
      propietario: []
    })



    let arraypaciente: Array<Paciente> = [];
    this.servicepaciente.getpaciente().subscribe(datos => {
      this.datosPaciente = datos.dato;
    })

    let arraypropietario: Array<Propietario> = [];
    this.servicepropietario.getPropietarios().subscribe(datos => {
      this.datosPropietario = datos.dato;
    })

    let arrayespecie: Array<Especies> = [];
    this.servicespecies.getespecie().subscribe(datos => {
      this.datosEspecie = datos.dato;
    })
  }

  refresh() {
    let arraypaciente: Array<Paciente> = [];
    this.servicepaciente.getpaciente().subscribe(datos => {
      this.datosPaciente = datos.dato;
    })
  }

    //Guardar Paciente
    guardar(form: FormGroup) {
      if (this.myForm.valid) {

        const especie: Especies = {
          nmid: this.myForm.get('especie')?.value,
          nombre_especie: ''
        }
        const propietario: Propietario ={
          nmid: this.myForm.get('propietario')?.value,
          tipo_documento: '',
          ident_p: '',
          nombre_p: '',
          apellido_p: '',
          ciudad: { nmid: 0, nombre_ciudad: '' },
          telefono_p: '',
        }


        let parametros: any;
        parametros = {
          nmid: this.myForm.get('nmid')?.value,
          nombre_paciente: this.myForm.get('nombre_paciente')?.value,
          f_nacimiento: this.myForm.get('f_nacimiento')?.value,
          especie: especie,
          raza: this.myForm.get('raza')?.value,
          f_registro: this.myForm.get('f_registro')?.value,
          propietario: propietario
        }


        this.servicepaciente.guardar(parametros).subscribe(dato => {
          Swal.fire('Exito', 'Registro exitoso', 'success');
          this.refresh();
          this.myForm.reset();
        });
      } else {
        Swal.fire('Error', 'No se pudo guardar', 'error');

      }

    }

  mostrar(datos: {nmid:any,nombre_paciente: any,f_nacimiento:any,nmid_especie: any, raza: any,f_registro:any,nmid_propietario:any}) {
    this.myForm.setValue({
       nmid: datos.nmid,
       nombre_paciente: datos.nombre_paciente,
       f_nacimiento: datos.f_nacimiento,
       especie: datos.nmid_especie,
       raza: datos.raza,
       f_registro: datos.f_registro,
       propietario: datos.nmid_propietario
    })

  }


}