import { MiembrosComision } from "../../entity/miembros-comision.entity";


export interface MiembrosComisionRepository{
    createMiembrosComision(miembrosComision: MiembrosComision): Promise<MiembrosComision>;
    updateMiembrosComision(idMiembrosComision:string,MiembrosComision: MiembrosComision): Promise<MiembrosComision>;
    findAll():Promise<MiembrosComision[]>;
    findOneById(id:string):Promise<MiembrosComision>;
    actualizarBloqueo(id:string,esBloqueado:boolean):Promise<MiembrosComision>;
    findByTerm(termino:string, valor:string | number):Promise<MiembrosComision[]>;
}