import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SesionUseCase } from "src/core/application/services/sesion.use-case";
import { FindAllQuery } from "./find-all.query";

@QueryHandler(FindAllQuery)
export class FindAllHandler implements IQueryHandler<FindAllQuery>{

    constructor(private sesionUseCase: SesionUseCase) { }

    execute(query: FindAllQuery) {
        
        return this.sesionUseCase.getAllSesionesByFacultad(query.page, query.pageSize, query.idFacultad);
    }

}
