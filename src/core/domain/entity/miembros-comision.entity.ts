import { Base } from "src/core/shared/domain/base";


export class MiembrosComision extends Base{
    presidente:string;
    miembro1: string;
    miembro2: string;
    miembro3: string;
    facultad: string;
    iteracion: number;

    static CreateMiembroComision(presidente:string, miembro1:string, miembro2:string, miembro3:string, facultad:string, iteracion:number,usuarioCreacion:string ){
        const miembroComision= new MiembrosComision();
        miembroComision.presidente=presidente;
        miembroComision.miembro1=miembro1;
        miembroComision.miembro2=miembro2;
        miembroComision.miembro3=miembro3;
        miembroComision.facultad=facultad;
        miembroComision.iteracion=iteracion;
        miembroComision.esEliminado=false;
        miembroComision.esBloqueado=false;
        miembroComision.usuarioCreacion=usuarioCreacion;
        miembroComision.fechaCreacion=new Date();
        return miembroComision;
    }   
}