import { CommandHandler, ICommandHandler, } from "@nestjs/cqrs";
import { CreateSesionCommand } from "./create-sesion.command";
import { SesionUseCase } from "src/core/application/services/sesion.use-case";

@CommandHandler(CreateSesionCommand)
export class CreateSesionHandler implements ICommandHandler<CreateSesionCommand>{

    constructor(private sesionUseCase: SesionUseCase) { }

    execute(query: CreateSesionCommand) {
        
        return this.sesionUseCase.createSesion(query.createSesionDto, query.idUsuario);
    }

}
