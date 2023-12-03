import { CommandHandler, ICommandHandler, } from "@nestjs/cqrs";
import { SesionUseCase } from "src/core/application/services/sesion.use-case";
import { AgregarSolicitudCommand } from "./agregar-solicitud.command";

@CommandHandler(AgregarSolicitudCommand)
export class AgregarSolicitudHandler implements ICommandHandler<AgregarSolicitudCommand>{

    constructor(private sesionUseCase: SesionUseCase) { }

    execute(query: AgregarSolicitudCommand) {
        
        return this.sesionUseCase.agregarSolicitud(query.idSesion, query.idSolicitud, query.idUsuario);
    }

}
