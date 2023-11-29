
import { UpdateSesionDto } from "src/core/shared/dtos/sesion/update-sesion.dto";

export class UpdateSesionCommand {
    
    constructor(
                public readonly updateSesionDto:UpdateSesionDto,
                public readonly idUsuario:string
                ) { }
    
}   