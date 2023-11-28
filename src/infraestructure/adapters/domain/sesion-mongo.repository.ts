import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SesionRepository } from "src/core/domain/ports/outbound/sesion.repository";
import { Sesion } from "src/infraestructure/persistence/db/entities/sesion.entity";


@Injectable()
export class MongoSesionRepository implements SesionRepository {
    
    constructor(@InjectModel(Sesion.name) private solicitudRepository: Model<Sesion>) { }
    
    findAll(): Promise<Sesion[]> {
        return this.solicitudRepository.find({esEliminado:false});
    }

    findByTerm(termino:string, valor:string | number):Promise<Sesion[]>{
        return this.solicitudRepository.find({[termino]:valor, esEliminado:false})
    }

    createSesion(sesion: Sesion){
        return this.solicitudRepository.create(sesion);
    }

    updateSesion(idSesion:string,solicitud: Sesion){
        return this.solicitudRepository.findByIdAndUpdate(idSesion,solicitud, {new:true})
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