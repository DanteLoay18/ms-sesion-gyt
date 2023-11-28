
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../helpers/base';

@Schema()
export class MiembroComision extends Base{

    @Prop({type: String})
    presidente:string;
    @Prop({type: String})
    miembro1: string;
    @Prop({type: String})
    miembro2: string;
    @Prop({type: String})
    miembro3: string;
    @Prop({type: String})
    facultad: string;
    @Prop({type: Number})
    iteracion: number;


}

export const MiembroComisionSchema= SchemaFactory.createForClass(MiembroComision);


