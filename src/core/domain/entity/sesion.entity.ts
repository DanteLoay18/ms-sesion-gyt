import { Base } from "src/core/shared/domain/base";

export class Sesion extends Base{
    numeroSesion: string; 
    fechaSesion: Date;
    solicitudes:string[];
    miembroComision:string;
    facultad:string; 

    static CreateSesion(numeroSesion: string, fechaSesion: Date, miembroComision:string, facultad:string,usuarioCreacion:string){
        const sesion= new Sesion();

        sesion.numeroSesion=numeroSesion;
        sesion.fechaSesion=fechaSesion;
        sesion.solicitudes=[];
        sesion.miembroComision=miembroComision;
        sesion.facultad=facultad;
        sesion.fechaCreacion=new Date();
        sesion.usuarioCreacion=usuarioCreacion;
        sesion.esBloqueado=false;
        sesion.esEliminado=false;
        
        return sesion;
    }

    static UpdateSesion(numeroSesion: string, fechaSesion: Date,usuarioModificacion:string){
        const sesion= new Sesion();

        sesion.numeroSesion=numeroSesion;
        sesion.fechaSesion=fechaSesion;
        sesion.fechaModificacion=new Date();
        sesion.usuarioModificacion=usuarioModificacion;        
        return sesion;
    }

    static AgregarSolicitud(solicitudes:string[], usuarioModificacion:string){
        const sesion= new Sesion();
        
        sesion.solicitudes=solicitudes;
        sesion.fechaModificacion=new Date();
        sesion.usuarioModificacion=usuarioModificacion;        
        return sesion;
    }
}

