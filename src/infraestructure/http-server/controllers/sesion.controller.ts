import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { CreateSesionRequest } from '../model/sesion/create-sesion.request';
import { CreateSesionCommand } from 'src/core/application/features/sesion/write/create-sesion/create-sesion.command';
import { FindAllQuery, FindByBusquedaQuery, FindByIdQuery } from 'src/core/application/features/sesion/read';
import { FindAllPaginadoRequest } from '../model/sesion/find-all-paginado.request';
import { FindByBusquedaRequest } from '../model/sesion/find-by-busqueda.request';
import { AgregarSolicitudCommand, UpdateSesionCommand } from 'src/core/application/features/sesion/write';
import { UpdateSesionRequest } from '../model/sesion/update-sesion.request';
import { AgregarSolicitudRequest } from '../model/sesion/agregar-solicitud.request';

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

    @MessagePattern({cmd: 'find_by_busqueda'})
    async FindByBusqueda(findByBusquedaRequest:FindByBusquedaRequest) {

        return await this.query.execute(new FindByBusquedaQuery(findByBusquedaRequest));
        
    }
    
   @MessagePattern({cmd: 'create_sesion'})
    async createSesion({idUsuario,...createSesionRequest}:CreateSesionRequest) {

        return await this.command.execute(new CreateSesionCommand(createSesionRequest,idUsuario));
        
    }

    @MessagePattern({cmd: 'update_sesion'})
    async updateSesion({idUsuario,...updateSesionRequest}:UpdateSesionRequest) {

        return await this.command.execute(new UpdateSesionCommand(updateSesionRequest,idUsuario));
        
    }

    @MessagePattern({cmd: 'agregar_solicitud_sesion'})
    async agregarSolicitudSesion({idUsuario,idSesion,idSolicitud}:AgregarSolicitudRequest) {

        return await this.command.execute(new AgregarSolicitudCommand(idSesion,idSolicitud,idUsuario));
        
    }

    

    
}