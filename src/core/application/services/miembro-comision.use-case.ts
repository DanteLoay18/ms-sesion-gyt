import { BadRequestException, Injectable  } from "@nestjs/common";
import { Paginated } from "../utils/Paginated";
import { MiembrosComisionService } from "src/core/domain/services/miembros-comision.service";

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
            
            miembrosComision=miembrosComision.sort((a, b) => b.iteracion - a.iteracion);

            const ultimaIteracion = miembrosComision[0];

            return ultimaIteracion;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

   
    async getAllMiembrosComisionByFacultad(page:number, pageSize:number, idFacultad:string){
        try{
            let solicitud= await this.miembrosComisionService.findAll();

            solicitud= solicitud.filter(({facultad})=>facultad===idFacultad)
            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            if(solicitud.length === 0 && page !==1){
                const startIndex = (page - 2 )*pageSize;
                const endIndex = startIndex + pageSize;
                return {
                    page:page-1,
                    pageSize:pageSize,
                    items: solicitud.slice(startIndex,endIndex),
                    total: solicitud.length
                }
            }
            return Paginated.create({
                page,
                pageSize,
                items: solicitud.slice(startIndex,endIndex),
                total: solicitud.length
            });       

        }catch(error){
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