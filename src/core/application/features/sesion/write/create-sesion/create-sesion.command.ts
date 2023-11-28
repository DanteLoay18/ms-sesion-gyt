import { CreateSesionDto } from "src/core/shared/dtos/sesion/create-sesion.dto";

export class CreateSesionCommand {
    
    constructor(
                public readonly createSesionDto:CreateSesionDto,
                public readonly idUsuario:string
                ) { }
    
}