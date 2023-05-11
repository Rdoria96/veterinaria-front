import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      user: [''],
      pass: ['']
    });
  }

  guardar(form: FormGroup) {
    const user = form.get('user')?.value;
    const pass = form.get('pass')?.value;
    if (user === 'rdoria' && pass === 'rdoria96') {
      Swal.fire({
        title: 'Bienvenido a Veterinaria Guardian',
        text: '¡Gracias por iniciar sesión!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.router.navigate(['/home']);
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
