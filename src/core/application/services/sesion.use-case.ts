import { BadRequestException, Injectable  } from "@nestjs/common";
import { Paginated } from "../utils/Paginated";
import { SesionService } from "src/core/domain/services/sesion.service";
import { CreateSesionDto } from "src/core/shared/dtos/sesion/create-sesion.dto";
import { Sesion } from "src/core/domain/entity/sesion.entity";
import { MiembrosComisionUseCase } from "./miembro-comision.use-case";
import { FindByBusquedaDto } from "src/core/shared/dtos/sesion/find-by-busqueda.dto";
import { UpdateSesionDto } from "src/core/shared/dtos/sesion/update-sesion.dto";
@Injectable()
export class SesionUseCase{
    constructor(private readonly sesionService:SesionService,
                private readonly miembroComisionUseCase:MiembrosComisionUseCase){}

    async getSesionById(id:string){
        try{
            const sesion= await this.sesionService.findOneById(id);
     
            if(!sesion || sesion.esEliminado)
                return {
                    success:false,
                    message:"El id de la sesion no existe",
                    value:{}
                }
            

            return {
                success: true,
                message: "",
                value:sesion
            };
        }catch(error){
            this.handleExceptions(error)
        }
        
    }

   
   

    async getAllSesionesByFacultad(page:number, pageSize:number, idFacultad:string){
        try{
            let sesiones= await this.sesionService.findAll();

            sesiones= sesiones.filter(({facultad})=>facultad===idFacultad)
            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            if(sesiones.length === 0 && page !==1){
                const startIndex = (page - 2 )*pageSize;
                const endIndex = startIndex + pageSize;
                return {
                    page:page-1,
                    pageSize:pageSize,
                    items: sesiones.slice(startIndex,endIndex),
                    total: sesiones.length
                }
            }
            return Paginated.create({
                page,
                pageSize,
                items: sesiones.slice(startIndex,endIndex),
                total: sesiones.length
            });       

        }catch(error){
            this.handleExceptions(error)
        }
    }

    async findByBusqueda({page, pageSize, idFacultad, numeroSesion}:FindByBusquedaDto){
        try{
            let sesiones= await this.sesionService.findAll();

            sesiones= sesiones.filter(({facultad})=>facultad===idFacultad)
            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            sesiones= sesiones.filter(sesion => {
                const numeroSesionCoincide = !numeroSesion || sesion.numeroSesion.includes(numeroSesion);
            
                
                return numeroSesionCoincide;
              });

            return Paginated.create({
                page,
                pageSize,
                items: sesiones.slice(startIndex,endIndex),
                total: sesiones.length
            });       

        }catch(error){
            this.handleExceptions(error)
        }
    }

    
    async createSesion(createSesionDto:CreateSesionDto, usuarioCreacion:string){
        try {
            const sesionEncontrada = await this.findOneByTerm("numeroSesion", createSesionDto.numeroSesion, "", createSesionDto.facultad);

            if(sesionEncontrada)
                return {
                    success:false,
                    message:"Ese numero de sesion ya se encuentra registrada"
                }

            const miembroComision= await this.miembroComisionUseCase.createMiembroComision({presidente:createSesionDto.presidente, miembro1:createSesionDto.miembro1, miembro2:createSesionDto.miembro2, miembro3:createSesionDto.miembro3, facultad:createSesionDto.facultad}, usuarioCreacion)
            
            console.log(miembroComision)
            
            const sesion = Sesion.CreateSesion(createSesionDto.numeroSesion, createSesionDto.fechaSesion, miembroComision._id, createSesionDto.facultad,usuarioCreacion);
           
            const sesionCreado= await this.sesionService.createSesion(sesion);

            if(!sesionCreado)
                return {
                    success:false,
                    message:"La sesion no se pudo registrar correctamente"
                }

            return {
                success:true,
                message:"La sesion se creo correctamente"
            }

        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async updateSesion(updateSesionDto:UpdateSesionDto, usuarioModificacion:string){
        try {
            const {success, message, value}= await this.getSesionById(updateSesionDto.idSesion);

            if(!success){
                return {
                    success,
                    message
                }
            }

            const sesionEncontrada = await this.findOneByTerm("numeroSesion", updateSesionDto.numeroSesion, updateSesionDto.idSesion, updateSesionDto.facultad);

            if(sesionEncontrada)
                return {
                    success:false,
                    message:"Ese numero de sesion ya se encuentra registrada"
                }

            await this.miembroComisionUseCase.updateMiembroComision({presidente:updateSesionDto.presidente, miembro1:updateSesionDto.miembro1, miembro2:updateSesionDto.miembro2, miembro3:updateSesionDto.miembro3, facultad:updateSesionDto.facultad, idMiembroComision:value?.['miembroComision']}, usuarioModificacion)
            
            const sesion = Sesion.UpdateSesion(updateSesionDto.numeroSesion, updateSesionDto.fechaSesion,usuarioModificacion);
           
            const sesionActualizada= await this.sesionService.updateSesion(updateSesionDto.idSesion,sesion);

            if(!sesionActualizada)
                return {
                    success:false,
                    message:"La sesion no se pudo actualizar correctamente"
                }

            return {
                success:true,
                message:"La sesion se actualizo correctamente"
            }

        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async agregarSolicitud(idSesion:string, idSolicitud:string, usuarioModificacion:string){
        try {
            const {success, message, value}= await this.getSesionById(idSesion);

            if(!success){
                return {
                    success,
                    message
                }
            }
            const solicitudes = value?.['solicitudes'] || [];

            solicitudes.push(idSolicitud);

            const sesion = Sesion.AgregarSolicitud(solicitudes, usuarioModificacion);
           
            const sesionActualizada= await this.sesionService.updateSesion(idSesion,sesion);

            if(!sesionActualizada)
                return {
                    success:false,
                    message:"La solicitud no se agrego a la solicitud correctamente"
                }

            return {
                success:true,
                message:"La solicitud se agrego a la solicitud correctamente"
            }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async findOneByTerm(term:string, valor:string | number, idSesion:string, idFacultad:string){
        let sesiones= await this.sesionService.findByterm(term, valor);

        const sesionEcontrada= sesiones.find((sesion)=>sesion.facultad===idFacultad && sesion._id!==idSesion)

        return sesionEcontrada;
       
    }

    async bloquearSesion(id:string, esBloqueado:boolean){
        try {

            return await this.sesionService.bloquearSesion(id, esBloqueado);
        } catch (error) {
            this.handleExceptions(error)
        }
    }
    
    

    private handleExceptions(error:any){
        
        if(error.code==="23505")
        throw new BadRequestException(error.detail)
        
        

        throw new BadRequestException(error.message)
      }

      
}