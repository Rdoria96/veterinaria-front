import { Propietario } from './propietario';
import { Especies } from './especies';

export interface Paciente {
  nmid: number;
  nombre_paciente: string;
  f_nacimiento: Date;
  especie: Especies;
  raza: string;
  f_registro: Date;
  propietario: Propietario;
}
