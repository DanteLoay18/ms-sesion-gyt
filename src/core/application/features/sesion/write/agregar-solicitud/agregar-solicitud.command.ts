
export class AgregarSolicitudCommand {
    
    constructor(
                public readonly idSesion:string,
                public readonly idSolicitud:string,
                public readonly idUsuario:string
                ) { }
    
}   