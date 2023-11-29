import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { CreateSesionRequest } from '../model/sesion/create-sesion.request';
import { CreateSesionCommand } from 'src/core/application/features/sesion/write/create-sesion/create-sesion.command';
import { FindAllQuery, FindByIdQuery } from 'src/core/application/features/sesion/read';
import { FindAllPaginadoRequest } from '../model/sesion/find-all-paginado.request';

@Controller()
export class SesionController{

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}

    @MessagePattern({cmd: 'find_by_id'})
    async findById(idSesion:string) {

        return await this.query.execute(new FindByIdQuery(idSesion));
        
    }

    @MessagePattern({cmd: 'find_all_sesiones'})
    async findAllSesionesPaginado({idFacultad,page,pageSize}:FindAllPaginadoRequest) {

        return await this.query.execute(new FindAllQuery(page,pageSize,idFacultad));
        
    }

    
   @MessagePattern({cmd: 'create_sesion'})
    async findUltimaIteracionMiembroComision({idUsuario,...createSesionRequest}:CreateSesionRequest) {

        return await this.command.execute(new CreateSesionCommand(createSesionRequest,idUsuario));
        
    }

    
}