import { BadRequestException, Injectable  } from "@nestjs/common";
import { Paginated } from "../utils/Paginated";
import { MiembrosComisionService } from "src/core/domain/services/miembros-comision.service";
import { CreateMiembroComisionDto } from "src/core/shared/dtos/miembro-comision/create-miembro-comision.dto";
import { MiembrosComision } from "src/core/domain/entity/miembros-comision.entity";
import { UpdateMiembroComisionDto } from "src/core/shared/dtos/miembro-comision/update-miembro-comision.dto";

@Injectable()
export class MiembrosComisionUseCase{
    constructor(private readonly miembrosComisionService:MiembrosComisionService){}

    async getMiembrosComisiondById(id:string){
        try{
            const miembroComision= await this.miembrosComisionService.findOneById(id);
     
            if(!miembroComision || miembroComision.esEliminado)
                return {
                    success:false,
                    message:"El id del miembro de comision no existe",
                    value:{}
                }
            

            return {
                success: true,
                message: "",
                value:miembroComision
            };
        }catch(error){
            this.handleExceptions(error)
        }
        
    }

    async getUltimaIteracionMiembrosComisionByFacultad(idFacultad:string){
        try {
            let miembrosComision= (await this.miembrosComisionService.findAll()).filter(({facultad})=>facultad===idFacultad);
            
            if(miembrosComision.length>0){
                miembrosComision=miembrosComision.sort((a, b) => b.iteracion - a.iteracion);

                const ultimaIteracion = miembrosComision[0];
    
                return ultimaIteracion;
            }

            return null;
            
        } catch (error) {
            this.handleExceptions(error);
        }
    }

   
    async getAllMiembrosComisionByFacultad(page:number, pageSize:number, idFacultad:string){
        try{
            let miembrosdecomision= await this.miembrosComisionService.findAll();

            miembrosdecomision= miembrosdecomision.filter(({facultad})=>facultad===idFacultad)
            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            if(miembrosdecomision.length === 0 && page !==1){
                const startIndex = (page - 2 )*pageSize;
                const endIndex = startIndex + pageSize;
                return {
                    page:page-1,
                    pageSize:pageSize,
                    items: miembrosdecomision.slice(startIndex,endIndex),
                    total: miembrosdecomision.length
                }
            }
            return Paginated.create({
                page,
                pageSize,
                items: miembrosdecomision.slice(startIndex,endIndex),
                total: miembrosdecomision.length
            });       

        }catch(error){
            this.handleExceptions(error)
        }
    }

    async createMiembroComision({presidente, miembro1,miembro2,miembro3,facultad}:CreateMiembroComisionDto, usuarioCreacion:string){
        try {
            
            const miembroComisionUltimaIteracion = await this.getUltimaIteracionMiembrosComisionByFacultad(facultad);
            if(miembroComisionUltimaIteracion!==null){
                if(miembroComisionUltimaIteracion.presidente === presidente && miembroComisionUltimaIteracion.miembro1===miembro1 && miembroComisionUltimaIteracion.miembro2===miembro2 && miembroComisionUltimaIteracion.miembro3===miembro3)
                return miembroComisionUltimaIteracion;
            }
            

            const miembroComision = MiembrosComision.CreateMiembroComision(presidente, miembro1,miembro2,miembro3,facultad,((miembroComisionUltimaIteracion?.iteracion || 0)+1),usuarioCreacion);
           
            return await this.miembrosComisionService.createMiembrosComision(miembroComision);

        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async updateMiembroComision({idMiembroComision, presidente, miembro1, miembro2, miembro3}:UpdateMiembroComisionDto, usuarioModificacion:string){
        try {
            
            const {success, message, value} = await this.getMiembrosComisiondById(idMiembroComision);

            if(!success){
                return {
                    success,
                    message
                }
            }

            
            if(value?.['presidente'] === presidente && value?.['miembro1']===miembro1 && value?.['miembro2']===miembro2 && value?.['miembro3']===miembro3)
            return value;
            
            

            const miembroComision = MiembrosComision.UpdateMiembroComision(presidente, miembro1,miembro2,miembro3,value?.['iteracion'],usuarioModificacion);
           
            return await this.miembrosComisionService.updateMiembrosComision(idMiembroComision,miembroComision);

        } catch (error) {
            this.handleExceptions(error)
        }
    }
    

   
    async bloquearMiembrosComision(id:string, esBloqueado:boolean){
        try {

            return await this.miembrosComisionService.bloquearMiembrosComision(id, esBloqueado);
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