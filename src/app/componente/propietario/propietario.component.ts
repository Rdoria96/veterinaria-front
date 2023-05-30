import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PropietarioService } from '../../services/propietario.service';
import { Propietario } from 'src/app/interfaces/propietario';
import { HttpClient } from '@angular/common/http';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { CiudadService } from 'src/app/services/ciudad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css'],

})

export class PropietarioComponent implements OnInit {
  displayedColumns: string[] = ['nmid', 'tipo_documento', 'ident_p', 'nombre_p', 'apellido_p', 'ciudad', 'telefono_p', 'accion'];
  myForm!: FormGroup;
  datosPropietario: any;
  datosCiudad: any;
  filtroPropietario: string = '';


  constructor(private fb: FormBuilder, private propservice: PropietarioService, private ciudadservice: CiudadService, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [],
      tipo_documento: [''],
      ident_p: [''],
      nombre_p: [''],
      apellido_p: [''],
      ciudad: [],
      telefono_p: []
    })

    let arraypropietario: Array<Propietario> = [];
    this.propservice.getPropietarios().subscribe(datos => {
      this.datosPropietario = datos.dato;

    })

    let arrayciudad: Array<Ciudad> = [];
    this.ciudadservice.getCiudades().subscribe(datos => {
      this.datosCiudad = datos.dato;
    })
  }


  refresh() {
    let arraypropietario: Array<Propietario> = [];
    this.propservice.getPropietarios().subscribe(datos => {
      this.datosPropietario = datos.dato;
    })
  }

  //Guardar Propietario
  guardar(form: FormGroup) {
    if (this.myForm.valid) {

      const ciudad: Ciudad = {
        nmid: this.myForm.get('ciudad')?.value,
        nombre_ciudad: ''
      }


      let parametros: any;
      parametros = {
        nmid: this.myForm.get('nmid')?.value,
        tipo_documento: this.myForm.get('tipo_documento')?.value,
        ident_p: this.myForm.get('ident_p')?.value,
        nombre_p: this.myForm.get('nombre_p')?.value,
        apellido_p: this.myForm.get('apellido_p')?.value,
        ciudad: ciudad,
        telefono_p: this.myForm.get('telefono_p')?.value
      }

      this.propservice.guardar(parametros).subscribe(dato => {
        Swal.fire('Exito', 'Registro exitoso', 'success');
        this.refresh();
        this.myForm.reset();
      });
    } else {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    }
  }

  mostrar(datos: { nmid: any, tipo_documento: any, ident_p: any, nombre_p: any, apellido_p: any, nmid_ciudad_p: any, telefono_p: any }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      tipo_documento: datos.tipo_documento,
      ident_p: datos.ident_p,
      nombre_p: datos.nombre_p,
      apellido_p: datos.apellido_p,
      ciudad: datos.nmid_ciudad_p,
      telefono_p: datos.telefono_p
    });
  }


}
