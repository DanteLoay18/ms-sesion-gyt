
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../helpers/base';

@Schema()
export class Sesion extends Base{

    @Prop({type: String})
    numeroSesion:string;

    @Prop({type: Date})
    fechaSesion:Date;

    @Prop({type: String})
    facultad:string;

    @Prop({type: Array})
    solicitudes:string[];

    @Prop({type: String})
    miembroComision:string;


}

export const SesionSchema= SchemaFactory.createForClass(Sesion);


