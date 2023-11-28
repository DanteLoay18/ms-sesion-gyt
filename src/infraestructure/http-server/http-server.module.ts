import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MiembroComisionController } from './controllers/miembro-comision.controller';
import { SesionController } from './controllers/sesion.controller';

@Module({
    imports:[CoreModule],
    controllers:[
        MiembroComisionController,
        SesionController
    ]
})
export class HttpServerModule {}
