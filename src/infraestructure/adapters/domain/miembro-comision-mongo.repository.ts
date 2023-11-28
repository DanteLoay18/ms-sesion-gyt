import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MiembrosComisionRepository } from "src/core/domain/ports/outbound/miembros-comision.repository";
import { MiembroComision } from "src/infraestructure/persistence/db/entities/miembro-comision.entity";

@Injectable()
export class MongoMiembroComisionRepository implements MiembrosComisionRepository {
    
    constructor(@InjectModel(MiembroComision.name) private solicitudRepository: Model<MiembroComision>) { }
    
    findAll(): Promise<MiembroComision[]> {
        return this.solicitudRepository.find({esEliminado:false});
    }

    findByTerm(termino:string, valor:string | number):Promise<MiembroComision[]>{
        return this.solicitudRepository.find({[termino]:valor, esEliminado:false})
    }

    createMiembrosComision(sesion: MiembroComision){
        return this.solicitudRepository.create(sesion);
    }

    updateMiembrosComision(idMiembroComision:string,solicitud: MiembroComision){
        return this.solicitudRepository.findByIdAndUpdate(idMiembroComision,solicitud, {new:true})
    }
    
    findOneById(id:string){
        return this.solicitudRepository.findById(id);
    }
   
    
    actualizarBloqueo(id:string,esBloqueado:boolean){
        return this.solicitudRepository.findByIdAndUpdate(id, {
            esBloqueado  
            }, {new:true})
    }

    
   
    
   
}