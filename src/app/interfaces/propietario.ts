import { Ciudad } from "./ciudad"

export interface Propietario {
  nmid: number
  tipo_documento: string
  ident_p: string
  nombre_p: string
  apellido_p: string
  ciudad: Ciudad
  telefono_p: string
}
