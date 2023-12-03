import { PartialType } from '@nestjs/swagger';
import { CreateSesionRequest } from './create-sesion.request';


export class UpdateSesionRequest extends PartialType(CreateSesionRequest){

    idSesion:string;
}