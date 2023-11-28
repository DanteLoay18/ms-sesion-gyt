import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '../persistence/persistence.module';
import { MongoSesionRepository } from './domain/sesion-mongo.repository';
import { MongoMiembroComisionRepository } from './domain/miembro-comision-mongo.repository';

export const SESION_REPOSITORY = 'SESION_REPOSITORY';
export const MIEMBROCOMISION_REPOSITORY = 'MIEMBROCOMISION_REPOSITORY';

const providers = [
    MongoSesionRepository,
    {
        provide: SESION_REPOSITORY,
        useExisting: MongoSesionRepository,
    },
    MongoMiembroComisionRepository,
    {
        provide: MIEMBROCOMISION_REPOSITORY,
        useExisting: MongoMiembroComisionRepository,
    }
]


@Module({
    imports:[
        ConfigModule,
        PersistenceModule,
        
    ],
    providers:[
        ...providers
    ],
    exports:[
        ...providers,
       
    ]
})
export class AdaptersModule {}
