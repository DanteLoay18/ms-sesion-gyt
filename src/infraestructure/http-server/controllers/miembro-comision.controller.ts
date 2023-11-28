import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { FindUltimaIteracionByFacultadQuery } from 'src/core/application/features/miembros-comision/read/get-ultima-iteracion/find-ultima-iteracion.query';
@Controller()
export class MiembroComisionController{

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    
    

    @MessagePattern({cmd: 'findUltimaIteracion_miembroComision'})
    async findUltimaIteracionMiembroComision(idFacultad:string) {

        return await this.query.execute(new FindUltimaIteracionByFacultadQuery(idFacultad));
        
    }

   

    
}