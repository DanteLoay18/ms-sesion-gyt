import { CommandHandler, ICommandHandler, } from "@nestjs/cqrs";
import { SesionUseCase } from "src/core/application/services/sesion.use-case";
import { UpdateSesionCommand } from "./update-sesion.command";

@CommandHandler(UpdateSesionCommand)
export class UpdateSesionHandler implements ICommandHandler<UpdateSesionCommand>{

    constructor(private sesionUseCase: SesionUseCase) { }

    execute(query: UpdateSesionCommand) {
        
        return this.sesionUseCase.updateSesion(query.updateSesionDto, query.idUsuario);
    }

}
