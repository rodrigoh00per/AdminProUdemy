//ESTO ES PARA QUE PODAMOS TENER UNA CLASE Y PODAMOS TRABAJAR CON LOS DATOS DE LA BD DE UNA VEZ POR TODAS
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) {}
}


