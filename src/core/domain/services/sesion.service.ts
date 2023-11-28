import { Sesion } from "../entity/sesion.entity";
import { SesionRepository } from "../ports/outbound/sesion.repository";

export class SesionService{
    constructor(private readonly sesionRepository:SesionRepository){}

    findAll(){
        return this.sesionRepository.findAll();
    }

    findByterm(termino:string, valor:string | number){
        return this.sesionRepository.findByTerm(termino, valor);
    }

    findOneById(id:string){
        return this.sesionRepository.findOneById(id);
    }
    
    createSesion(sesion:Sesion){
        return this.sesionRepository.createSesion(sesion);
    }

    updateSesion(id:string,sesion:Sesion){
        return this.sesionRepository.updateSesion(id,sesion);
    }

    bloquearSesion(id:string, esBloqueado:boolean){
        return this.sesionRepository.actualizarBloqueo(id, esBloqueado);
    }

    

}