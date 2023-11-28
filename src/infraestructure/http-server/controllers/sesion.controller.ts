import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { CreateSesionRequest } from '../model/sesion/create-sesion.request';
import { CreateSesionCommand } from 'src/core/application/features/sesion/write/create-sesion/create-sesion.command';

@Controller()
export class SesionController{

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    
    

    
   @MessagePattern({cmd: 'create_sesion'})
    async findUltimaIteracionMiembroComision({idUsuario,...createSesionRequest}:CreateSesionRequest) {

        return await this.command.execute(new CreateSesionCommand(createSesionRequest,idUsuario));
        
    }

    
}