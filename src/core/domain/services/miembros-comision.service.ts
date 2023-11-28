import { MiembrosComision } from "../entity/miembros-comision.entity";
import { MiembrosComisionRepository } from "../ports/outbound/miembros-comision.repository";

export class MiembrosComisionService{
    constructor(private readonly miembrosComisionRepository:MiembrosComisionRepository){}

    findAll(){
        return this.miembrosComisionRepository.findAll();
    }

    findByterm(termino:string, valor:string | number){
        return this.miembrosComisionRepository.findByTerm(termino, valor);
    }

    findOneById(id:string){
        return this.miembrosComisionRepository.findOneById(id);
    }
    
    createMiembrosComision(miembrosComision:MiembrosComision){
        return this.miembrosComisionRepository.createMiembrosComision(miembrosComision);
    }

    updateMiembrosComision(id:string,miembrosComision:MiembrosComision){
        return this.miembrosComisionRepository.updateMiembrosComision(id,miembrosComision);
    }

    bloquearMiembrosComision(id:string, esBloqueado:boolean){
        return this.miembrosComisionRepository.actualizarBloqueo(id, esBloqueado);
    }

    

}