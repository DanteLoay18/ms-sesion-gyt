import { Sesion } from "../../entity/sesion.entity";

export interface SesionRepository{
    createSesion(sesion: Sesion): Promise<Sesion>;
    updateSesion(idSesion:string,Sesion: Sesion): Promise<Sesion>;
    findAll():Promise<Sesion[]>;
    findOneById(id:string):Promise<Sesion>;
    actualizarBloqueo(id:string,esBloqueado:boolean):Promise<Sesion>;
    findByTerm(termino:string, valor:string | number):Promise<Sesion[]>;
}