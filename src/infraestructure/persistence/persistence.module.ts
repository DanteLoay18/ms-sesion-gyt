import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Sesion, SesionSchema } from './db/entities/sesion.entity';
import { MiembroComision, MiembroComisionSchema } from './db/entities/miembro-comision.entity';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {name: Sesion.name, schema: SesionSchema},
      {name: MiembroComision.name, schema: MiembroComisionSchema},
    ])
  ],
  exports:[
    DatabaseModule,
    MongooseModule
  ]
})
export class PersistenceModule {}
