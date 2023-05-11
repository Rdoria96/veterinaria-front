import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componente/login/login.component';
import { PacienteComponent } from './componente/paciente/paciente.component';
import { SidebarComponent } from './componente/sidebar/sidebar.component';
import { PropietarioComponent } from './componente/propietario/propietario.component';
const routes: Routes = [
  {
    path: "",
    component:LoginComponent
  },
  {
    path: "home",
    component: SidebarComponent, children:[
      {
        path: "propietario",
        component: PropietarioComponent
      },
      {
        path: "paciente",
        component: PacienteComponent
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
