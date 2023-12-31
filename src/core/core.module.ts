import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AdaptersModule, MIEMBROCOMISION_REPOSITORY, SESION_REPOSITORY } from 'src/infraestructure/adapters/adapters.module';
import { PersistenceModule } from 'src/infraestructure/persistence/persistence.module';
import { FindUltimaIteracionByFacultadHandler, FindUltimaIteracionByFacultadQuery } from './application/features/miembros-comision/read';
import { SesionService } from './domain/services/sesion.service';
import { SesionRepository } from './domain/ports/outbound/sesion.repository';
import { SesionUseCase } from './application/services/sesion.use-case';
import { MiembrosComisionService } from './domain/services/miembros-comision.service';
import { MiembrosComisionRepository } from './domain/ports/outbound/miembros-comision.repository';
import { MiembrosComisionUseCase } from './application/services/miembro-comision.use-case';
import { AgregarSolicitudCommand, AgregarSolicitudHandler, CreateSesionCommand, CreateSesionHandler, UpdateSesionCommand, UpdateSesionHandler } from './application/features/sesion/write';
import { FindAllHandler, FindAllQuery, FindByBusquedaHandler, FindByBusquedaQuery, FindByIdHandler, FindByIdQuery } from './application/features/sesion/read';

const MIEMBROCOMISION_PROVIDERS=[
    FindUltimaIteracionByFacultadQuery,
    FindUltimaIteracionByFacultadHandler
]
const SESION_PROVIDERS=[
    FindAllQuery,
    FindAllHandler,
    FindByIdQuery,
    FindByIdHandler,
    FindByBusquedaQuery,
    FindByBusquedaHandler,
    CreateSesionCommand,
    CreateSesionHandler,
    UpdateSesionCommand,
    UpdateSesionHandler,
    AgregarSolicitudCommand,
    AgregarSolicitudHandler
]

const providers = [
    ...MIEMBROCOMISION_PROVIDERS,
    ...SESION_PROVIDERS
]



@Module({
    imports:[
        PersistenceModule,
        AdaptersModule,
        CqrsModule
    ],
    providers:[
        ...providers,
        {
            provide:MiembrosComisionService,
            useFactory:(
                miembrosComisionRepository:MiembrosComisionRepository
            )=> new MiembrosComisionService(miembrosComisionRepository),
            inject:[
                MIEMBROCOMISION_REPOSITORY
            ]
        },
        {
            provide: MiembrosComisionUseCase,
            useFactory: (miembroComisionService: MiembrosComisionService,) => new MiembrosComisionUseCase(miembroComisionService),
            inject: [
                MiembrosComisionService
            ] 
        },
        {
            provide:SesionService,
            useFactory:(
                sesionRepository:SesionRepository
            )=> new SesionService(sesionRepository),
            inject:[
                SESION_REPOSITORY
            ]
        },
        {
            provide: SesionUseCase,
            useFactory: (sesionService: SesionService,miembrosComisionUseCase:MiembrosComisionUseCase) => new SesionUseCase(sesionService,miembrosComisionUseCase),
            inject: [
                SesionService,
                MiembrosComisionUseCase
            ] 
        },
        
        
    ],
    exports:[
        ...providers,
        CqrsModule,
        AdaptersModule
    ]
})
export class CoreModule {}
