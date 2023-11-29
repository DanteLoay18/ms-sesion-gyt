import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { MiembrosComisionUseCase } from "src/core/application/services/miembro-comision.use-case";
import { FindByBusquedaQuery } from "./find-by-busqueda.query";
import { SesionUseCase } from "src/core/application/services/sesion.use-case";

@QueryHandler(FindByBusquedaQuery)
export class FindByBusquedaHandler implements IQueryHandler<FindByBusquedaQuery>{

    constructor(private sesionUseCase: SesionUseCase) { }

    execute(query: FindByBusquedaQuery) {
        
        return this.sesionUseCase.findByBusqueda(query.findByBusquedaDto);
    }

}
