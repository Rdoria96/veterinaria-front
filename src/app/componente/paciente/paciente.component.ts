import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Especies } from 'src/app/interfaces/especies';
import { Paciente } from 'src/app/interfaces/paciente';
import { Propietario } from 'src/app/interfaces/propietario';
import { EspeciesService } from 'src/app/services/especies.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { PropietarioService } from 'src/app/services/propietario.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

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
  filtroNombrePaciente: string = '';

  constructor(private fb: FormBuilder, private servicepaciente: PacienteService, private servicepropietario: PropietarioService, private servicespecies: EspeciesService, private datepipe: DatePipe) { }
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
    const f_nacimiento = new Date(datos.f_nacimiento);
    f_nacimiento.setDate(f_nacimiento.getDate() + 1);
    const f_registro = new Date(datos.f_registro);
    f_registro.setDate(f_registro.getDate() + 1);
    this.myForm.setValue({
       nmid: datos.nmid,
       nombre_paciente: datos.nombre_paciente,
      f_nacimiento: f_nacimiento,
       especie: datos.nmid_especie,
       raza: datos.raza,
      f_registro: f_registro,
       propietario: datos.nmid_propietario
    })
  }


  exportar() {
    const data: Paciente[] = this.datosPaciente.map((paciente: Paciente) => {
      const especie = paciente.especie?.nombre_especie || '';
      const propietario = paciente.propietario?.ident_p || '';
      return {
        nmid: paciente.nmid,
        nombre_paciente: paciente.nombre_paciente,
        f_nacimiento: paciente.f_nacimiento,
        especie: especie,
        raza: paciente.raza,
        f_registro: paciente.f_registro,
        propietario: propietario
      };
    });

    console.log(data);
    //Convierte la data array en una hoja de calculo
    const worksheet = XLSX.utils.json_to_sheet(data);

    //Agrega hoja de calculo a libreria
    const workbook = XLSX.utils.book_new();

    //El worksheet se anexa a workbook con el nombre pacientes
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pacientes');

    //Convirte el workbook en un archivo excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    //Se instancia excelBuffer el cual se representa el archivo excel
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    //Se genera un nombre para el archivo excel
    const excelFilename = 'pacientes.xlsx';

    //se genera un link para el archivo excel
    const downloadLink = document.createElement('a');

    //se genera un link para descargar el archivo excel
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = excelFilename;
    downloadLink.click();
  }



}
