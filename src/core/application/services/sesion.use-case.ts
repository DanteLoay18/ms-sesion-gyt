import { BadRequestException, Injectable  } from "@nestjs/common";
import { Paginated } from "../utils/Paginated";
import { SesionService } from "src/core/domain/services/sesion.service";
import { CreateSesionDto } from "src/core/shared/dtos/sesion/create-sesion.dto";
import { Sesion } from "src/core/domain/entity/sesion.entity";
@Injectable()
export class SesionUseCase{
    constructor(private readonly sesionService:SesionService){}

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
            let sesion= await this.sesionService.findAll();

            sesion= sesion.filter(({facultad})=>facultad===idFacultad)
            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            if(sesion.length === 0 && page !==1){
                const startIndex = (page - 2 )*pageSize;
                const endIndex = startIndex + pageSize;
                return {
                    page:page-1,
                    pageSize:pageSize,
                    items: sesion.slice(startIndex,endIndex),
                    total: sesion.length
                }
            }
            return Paginated.create({
                page,
                pageSize,
                items: sesion.slice(startIndex,endIndex),
                total: sesion.length
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

            const miembroComision :string=""
            const sesion = Sesion.CreateSesion(createSesionDto.numeroSesion, createSesionDto.fechaSesion, miembroComision, createSesionDto.facultad,usuarioCreacion);
           
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

    async findOneByTerm(term:string, valor:string | number, idSesion:string, idFacultad:string){
        let sesiones= await this.sesionService.findByterm(term, valor);

        const sesionEcontrada= sesiones.filter((sesion)=>sesion.facultad===idFacultad && sesion._id!==idSesion)

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