import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindUltimaIteracionByFacultadQuery } from "./find-ultima-iteracion.query";
import { MiembrosComisionUseCase } from "src/core/application/services/miembro-comision.use-case";

@QueryHandler(FindUltimaIteracionByFacultadQuery)
export class FindUltimaIteracionByFacultadHandler implements IQueryHandler<FindUltimaIteracionByFacultadQuery>{

    constructor(private miembrosComisionUseCase: MiembrosComisionUseCase) { }

    execute(query: FindUltimaIteracionByFacultadQuery) {
        
        return this.miembrosComisionUseCase.getUltimaIteracionMiembrosComisionByFacultad(query.idFacultad);
    }

}
