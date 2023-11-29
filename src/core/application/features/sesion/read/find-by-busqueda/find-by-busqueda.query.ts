import { FindByBusquedaDto } from "src/core/shared/dtos/sesion/find-by-busqueda.dto";

export class FindByBusquedaQuery {
    
    constructor(
                public readonly findByBusquedaDto:FindByBusquedaDto
                ) { }
    
}