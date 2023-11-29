import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "./find-by-id.query";
import { SesionUseCase } from "src/core/application/services/sesion.use-case";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery>{

    constructor(private sesionUseCase: SesionUseCase) { }

    execute(query: FindByIdQuery) {
        
        return this.sesionUseCase.getSesionById(query.idSesion);
    }

}
